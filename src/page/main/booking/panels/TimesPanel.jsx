import "../css/timespanel.css"

export default function TimesPanel() {
    return (
        <div className="panel times-panel">
            <div className="times-header">
                <h3>날짜 선택</h3>
            </div>
            <div className="filter-options">
                <button>전체</button>
                <button>13시 이후</button>
                <button>19시 이후</button>
                <button>심야</button>
            </div>
        </div>

    );
}
