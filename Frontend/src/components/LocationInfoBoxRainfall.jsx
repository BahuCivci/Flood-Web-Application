import React from 'react';
// setLocationInfoRainfall({name, unit, oneHourTotal, sixHourTotal, dayTotal, value_date})
function LocationInfoBoxRainfall({info}) {
    return (
        <div className="location-info">
            <ul>
                
                <><li><strong>Rainfall at </strong></li><li><strong>{info.name}</strong></li></>
                <li><strong>1 hour&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6 hours&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;24 hours </strong></li>
                <li><strong>{info.oneHourTotal}mm &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{info.sixHourTotal}mm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{info.dayTotal}mm</strong></li>
                
                <li><strong>Recent rainfall up to {info.date.slice(11,16) || null}, {info.date.slice(0,10) || null}</strong></li>

            </ul>
        </div>
    );
}

export default LocationInfoBoxRainfall;