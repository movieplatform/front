import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/session", { credentials: "include" })
            .then(res => res.json())
            .then(data => setAuthorized(data)) // 로그인 여부 true/false
            .catch(() => setAuthorized(false))
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) return <div>로딩 중...</div>;
    if (!authorized) return navigate("/login"); // 로그인 안되면 이동
    return children;
}
