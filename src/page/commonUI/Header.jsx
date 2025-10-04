import React, {useState, useEffect, useMemo} from "react";
import "./css/Header.css";
import logo from "../asset/logo.png";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { debounce } from "lodash";
import ContactForm from "../main/ContactForm";

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [open, setOpen] = useState(false);


    //임시 state
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);


    useEffect(() => {
        // 로그인 여부 체크
        axios.get("http://localhost:8080/api/session", { withCredentials: true })
            .then(res => {
                setLoggedIn(res.data);
                if (res.data) {
                    // 로그인 되어 있으면 관리자 여부 체크
                    axios.get("http://localhost:8080/api/admin/check", { withCredentials: true })
                        .then(res => setIsAdmin(true))  // 200 → 관리자
                        .catch(err => setIsAdmin(false)); // 403 → 관리자 아님
                } else {
                    setIsAdmin(false);
                }
            })
            .catch(() => {
                setLoggedIn(false);
                setIsAdmin(false);
            });
    }, []);

    //로그아웃하는 컨트롤러만 연결 ㄱㄱ
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true });
            setLoggedIn(false);
            window.location.href = "/"; // 홈으로 이동
        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    };

    const debouncedSearch = useMemo(
        () => debounce(async (q) => {
            if(q.length < 1) return setResults([]);
            try {
                const res = await axios.get("http://localhost:8080/api/movies/search", {
                    params: { keyword: q },
                    withCredentials: true
                });
                setResults(res.data.map(it => ({ docId: it.docId, title: it.title })));
            } catch (err) {
                console.error(err);
                setResults([]);
            }
        }, 300),
        []
    );

    return (
        <div className="hdr">
            <div className="hdr-top">
                <div className="container">
                    <nav className="top-auth">
                        {loggedIn ? (
                            <>
                                <button onClick={handleLogout} className="logout-btn">
                                    로그아웃
                                </button>
                                {isAdmin && <a href="/adminpage" className="admin-btn">관리자 페이지</a>}
                            </>
                        ) : (
                            <>
                                <a href="/login">로그인</a>
                                <span className="divider">│</span>
                                <a href="/register">회원가입</a>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            <div className="hdr-main">
                <div className="container">
                    {/* 좌측 */}
                    <div className="left">
                        <div className={`search-box ${open ? "open" : ""}`}>
                            <button
                                className="icon-btn"
                                aria-label="검색"
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                <FiSearch size={20} />
                            </button>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    debouncedSearch(e.target.value);
                                }}
                                placeholder="영화 검색"
                            />

                            {/* 검색결과 */}
                            {open && results.length > 0 && (
                                <div className="search-results">
                                    {results.map(r => (
                                        <div
                                            key={r.docId}
                                            className="result-item"
                                            onClick={() => {
                                                // 클릭하면 상세페이지로 이동
                                                window.location.href = `/movies/${r.docId}`;
                                            }}
                                        >
                                            {r.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <a className="navlink active" href="/movies">영화</a>
                        <a className="navlink" href="/booking">영화 예매</a>
                    </div>

                    {/* 가운데 로고 */}
                    {/* 로고 */}
                    <a className="logo" href="/">
                        <img src={logo} alt="Movie Score Logo" />
                    </a>

                    {/* 우측 */}
                    <div className="right">
                        <a className="navlink" href="ContactForm">문의하기</a>
                        <a className="mypage" href="/mypage">마이페이지</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
