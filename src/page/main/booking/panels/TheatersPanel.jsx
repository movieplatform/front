import "../css/theaterspanel.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TheatersPanel({ onSelect }) {
    const [regions, setRegions] = useState([]);
    const [theatersByRegion, setTheatersByRegion] = useState({});
    const [activeRegion, setActiveRegion] = useState("");
    const [activeTheater, setActiveTheater] = useState(null);


    useEffect(() => {
        axios
            .get("http://localhost:8080/api/reservation/theaters", {
                withCredentials: true,
            })
            .then((res) => {
                console.log("🎬 극장 목록 응답:", res.data);

                const grouped = { 광주: res.data };

                setTheatersByRegion(grouped);
                setRegions(["광주"]);
            })
            .catch((err) => {
                console.error("극장 목록 불러오기 실패:", err);
            });
    }, []);

    const handleRegionClick = (region) => {
        if (activeRegion === region) {
            // 이미 선택된 지역 → 해제
            setActiveRegion("");
            setActiveTheater(null);
            onSelect({ region: null, theater: null });
        } else {
            // 새로운 지역 선택
            setActiveRegion(region);
            setActiveTheater(null);
            onSelect({ region, theater: null });
        }
    };

    const handleTheaterClick = (theater) => {
        if (activeTheater?.id === theater.id) {
            // 이미 선택된 극장 → 해제
            setActiveTheater(null);
            onSelect({ region: activeRegion, theater: null });
        } else {
            // 새로운 극장 선택
            setActiveTheater(theater);
            onSelect(theater); // {id, region, theaterName}
        }
    };

    return (
        <div className="panel theaters-panel">
            <div className="theaters-header">
                <h3 className="center-text">지역 선택</h3>
                <h3 className="center-text">극장 선택</h3>
            </div>

            <div className="columns">
                {/* 지역 목록 */}
                <div className="col region-col">
                    <ul>
                        {regions.map((region) => (
                            <li
                                key={region}
                                className={activeRegion === region ? "active" : ""}
                                onClick={() => handleRegionClick(region)}
                            >
                                {region}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 극장 목록 */}
                <div className="col theater-col">
                    <ul>
                        {activeRegion &&
                            theatersByRegion[activeRegion]?.map((theater) => (
                                <li
                                    key={theater.id}
                                    className={activeTheater?.id === theater.id ? "active" : ""}
                                    onClick={() => handleTheaterClick(theater)}
                                >
                                    {theater.theaterName}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
