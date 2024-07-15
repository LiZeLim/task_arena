import React from "react";

export const UserStats = ({ params } : { params: {numPush: number, numPull: number, numLegs: number}}) => {
    console.log(params.numPush, params.numPull, params.numLegs);

    return (
        <div>
            <div className="stats stats-vertical">
                <div className="stat">
                    <div className="stat-title">Push</div>
                    <div className="stat-value">{params.numPush}</div>
                    <div className="stat-desc"></div>
                </div>

                <div className="stat">
                    <div className="stat-title">Pull</div>
                    <div className="stat-value">{params.numPull}</div>
                    <div className="stat-desc"></div>
                </div>

                <div className="stat">
                    <div className="stat-title">Legs</div>
                    <div className="stat-value">{params.numLegs}</div>
                    <div className="stat-desc"></div>
                </div>
            </div>
        </div>
    );
};
