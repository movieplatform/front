import React, { useState } from "react";
import "./faq.css";

/**
 * FAQ 컴포넌트
 * - props.items 로 질문/답변 배열을 넣을 수 있고, 없으면 기본 목록 사용
 * - 다크테마 카드형 + 아코디언
 */
export default function FAQ({ items }) {
    const defaultItems = [
        {
            q: "예매한 영화는 어디서 확인할 수 있나요?",
            a: "마이페이지 > 예매내역에서 확인할 수 있습니다.",
        },
        {
            q: "예매 취소는 언제까지 가능한가요?",
            a: "상영 시작 20분 전까지 온라인으로 취소 가능합니다. 그 이후에는 극장 창구로 문의해 주세요.",
        },
        {
            q: "결제 수단은 어떤 게 있나요?",
            a: "토스 결제를 지원합니다.",
        },
        {
            q: "회원가입 없이도 예매할 수 있나요?",
            a: "비회원 예매도 가능하지만, 조회/취소 등 일부 기능이 제한될 수 있어요.",
        },
    ];

    const data = items && items.length ? items : defaultItems;
    const [openSet, setOpenSet] = useState(new Set());

    const toggle = (idx) => {
        const next = new Set(openSet);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        setOpenSet(next);
    };

    return (
        <section className="faq-wrap" aria-labelledby="faq-title">
            <div className="faq-header">
                <h2 id="faq-title">자주 찾는 질문</h2>
                <p className="faq-sub">궁금한 점을 바로 확인해보세요</p>
            </div>

            <div className="faq-list" role="list">
                {data.map((item, idx) => {
                    const isOpen = openSet.has(idx);
                    const panelId = `faq-panel-${idx}`;
                    const btnId = `faq-button-${idx}`;
                    return (
                        <article className={`faq-item ${isOpen ? "open" : ""}`} key={idx} role="listitem">
                            <button
                                id={btnId}
                                className="faq-q"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(idx)}
                            >
                                <span className="q-prefix">Q.</span>
                                <span className="q-text">{item.q}</span>
                                <span className="chev" aria-hidden>{isOpen ? "▾" : "▸"}</span>
                            </button>

                            {isOpen && (
                                <div
                                    id={panelId}
                                    className="faq-a"
                                    role="region"
                                    aria-labelledby={btnId}
                                >
                                    <span className="a-prefix">A.</span>
                                    <p className="a-text">{item.a}</p>
                                </div>
                            )}

                        </article>
                    );
                })}
            </div>
        </section>
    );
}
