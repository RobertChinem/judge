import React from "react";


function Progress() {
    return (
        <div className="progress">
            <div className="progress-bar" role="progressbar"  aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
            </div>
        </div>
    )
}

export default Progress
