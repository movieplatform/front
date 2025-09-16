import "../css/theaterspanel.css"
import { useState } from "react";


export default function TheatersPanel({ onSelect }) {

    const [activeRegion, setActiveRegion] = useState("");
    const [activeTheater, setActiveTheater] = useState("");

    const regions = ["광주"];
    const theaters = ["광주광산", "광주첨단", "충장로"];

    const handleRegionClick = (region) => {
        setActiveRegion(region);
        // 지역만 선택했을 때는 극장은 아직 없으니까 null
        onSelect({ region, theater: null });
    };

    const handleTheaterClick = (theater) => {
        setActiveTheater(theater);
        // ✅ region + theater 둘 다 부모에 전달
        onSelect({ region: activeRegion, theater });
    };
    return (
        <div className="panel theaters-panel">
            <div className="theaters-header">
                <h3 className="center-text">지역 선택</h3>
                <h3 className="center-text">극장 선택</h3>

            </div>
            <div className="columns">

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

                <div className="col theater-col">
                    <ul>
                        {theaters.map((theater) => (
                            <li
                                key={theater}
                                className={activeTheater === theater ? "active" : ""}
                                onClick={() => handleTheaterClick(theater)}
                            >
                                {theater}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
