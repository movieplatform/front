import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import { FaStar } from "react-icons/fa";
export default function CarouselRow({ movies = [], title = "평점 높은 영화" }) {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const VISIBLE = 4;
    const [index, setIndex] = useState(0);
    const maxIndex = Math.max(0, movies.length - VISIBLE);

    const [step, setStep] = useState(0);

    // 측정 함수: 카드 너비 + gap
    const measure = () => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector(".card");
        if (!card) return;
        const gap = parseFloat(getComputedStyle(track).gap || "24");
        setStep(card.getBoundingClientRect().width + gap);
    };

    // 최초 / 리사이즈 시 step 갱신
    useEffect(() => {
        measure();
        const ro = new ResizeObserver(measure);
        if (viewportRef.current) ro.observe(viewportRef.current);
        if (trackRef.current) ro.observe(trackRef.current);
        return () => ro.disconnect();
    }, []);

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const goTo = (i) => setIndex((prev) => clamp(i, 0, maxIndex));
    const onPrev = () => goTo(index - 1);
    const onNext = () => goTo(index + 1);

    const canPrev = index > 0;
    const canNext = index < maxIndex;

    // fallback 카드 (글래스 디자인 스켈레톤)
    const fallbackCards = Array.from({ length: 4 }).map((_, i) => (
        <div key={`fallback-${i}`} className="card">
            <div className="placeholder">
                <div className="shimmer" />
                <div className="ph-text">No Data</div>
            </div>
            <div className="card-bottom">
                <div className="title">데이터 없음</div>
                <button className="cta" disabled>
                    자세히
                </button>
            </div>
        </div>
    ));
    const cards =
        movies.length > 0
            ? movies.map((m) => (
                <a key={m.id} className="card" href={`/movies/${m.id}`}>
                    <div className={`rank rank-${m.rank}`}>{m.rank}</div>

                    {/* 포스터 컨테이너 추가 */}
                    <div className="poster-container">
                        {m.poster ? (
                            <img className="poster" src={m.poster} alt={m.title} />
                        ) : (
                            <div className="placeholder">
                                <div className="shimmer" />
                                <div className="ph-text">Coming Soon</div>
                            </div>
                        )}
                    </div>

                    <div className="card-bottom">
                        <div className="title-rating">
                            <span className="title">{m.title}</span>
                            <span className="rating">
                                <FaStar color="#ffd43b" size={14} style={{ marginRight: 2 }} />
                                {m.averageRating?.toFixed(2) ?? "0.00"}
                            </span>
                        </div>
                    </div>

                </a>
            ))
            : fallbackCards;

    return (
        <section className="carousel">
            <h2 className="section-title">
                <span className="star"></span> {title} <span className="star"></span>
            </h2>

            <div ref={viewportRef} className="viewport">
                <div className="edge-fade left" aria-hidden />
                <div className="edge-fade right" aria-hidden />

                <button
                    className="nav-pill nav-pill-left"
                    onClick={onPrev}
                    disabled={!canPrev}
                    aria-label="이전"
                >
                    ‹
                </button>

                <div
                    ref={trackRef}
                    className="track"
                    style={{ transform: `translateX(${-index * step}px)` }}
                >
                    {cards}
                </div>

                <button
                    className="nav-pill nav-pill-right"
                    onClick={onNext}
                    disabled={!canNext}
                    aria-label="다음"
                >
                    ›
                </button>
            </div>
        </section>
    );
}