import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminRoute({ children }) {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/admin/check`, { withCredentials: true })
            .then(() => setAuthorized(true))   // 성공 → 관리자 접근 가능
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    setAuthorized(false); // 403이면 권한 없음
                } else {
                    setAuthorized(false); // 기타 에러도 권한 없음 처리
                }
            });
    }, []);

    if (authorized === null) {
        return <div>Loading...</div>;
    }

    return authorized ? children : <Navigate to="/" replace />;
}

export default AdminRoute;
