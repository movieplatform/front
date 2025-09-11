import "../css/theaterspanel.css"
import { useState } from "react";


export default function TheatersPanel() {

    const [activeRegion, setActiveRegion] = useState("");
    const [activeTheater, setActiveTheater] = useState("");

    const regions = ["광주"];
    const theaters = ["광주광산", "광주첨단", "충장로"];



    return (
        <div className="panel theaters-panel">
            <div className="theaters-header">
                <h3>지역 선택</h3>
                <h3>극장 선택</h3>
            </div>
            <div className="columns">

                <div className="col region-col">

                    <ul>
                        {regions.map((region) => (
                            <li
                                key={region}
                                className={activeRegion === region ? "active" : ""}
                                onClick={() => setActiveRegion(region)}
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
                                onClick={() => setActiveTheater(theater)}
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
