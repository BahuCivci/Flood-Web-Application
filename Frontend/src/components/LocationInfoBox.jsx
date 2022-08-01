import React from 'react';
// setLocationInfo({id, type, atrisk, name, value,value_date,river})
function LocationInfoBox({info}) {
    return (
        <div className="location-info">
            <ul>
                {info.type === 'S' && 
                    <><li><strong>River level measurement</strong></li><li><strong>{info.name}, {info.river}</strong></li></>
                
                }
                {info.type ==='G' &&
                    <><li><strong>Groundwater measurement</strong></li><li><strong>{info.name}</strong></li></>
                }
                {info.type ==='C' &&
                    <><li><strong>Sea level measurement</strong></li><li><strong>{info.name}</strong></li></>     
                }
                <li><strong>{info.value}m at {info.value_date.slice(11,16) || null}, {info.value_date.slice(0,10) || null}</strong></li>
                {info.atrisk &&
                    <li><strong>High</strong></li>
                }
            </ul>
        </div>
    );
}

export default LocationInfoBox;