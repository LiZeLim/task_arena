import React from "react";

export const UserStats = () => {
    return (
        <div>
            <div className="stats stats-vertical">
                <div className="stat">
                    <div className="stat-title">Push</div>
                    <div className="stat-value">1</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Pull</div>
                    <div className="stat-value">1</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Legs</div>
                    <div className="stat-value">1</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};
