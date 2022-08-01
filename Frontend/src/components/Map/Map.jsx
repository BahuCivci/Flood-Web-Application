import React, { useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api"
import { useGetMapMarkersQuery } from "../../services/mapData"
import { useGetRainfallMarkersQuery } from "../../services/rainfallData"
import LocationInfoBox from "../LocationInfoBox"
import LocationInfoBoxRainfall from "../LocationInfoBoxRainfall"
import { Select } from "antd"
import Loader from "../Loader"
const { Option } = Select

const containerStyle = {
  width: "100%",
  height: "85vh",
}

const center = {
  lat: 51.908463,
  lng: -0.46427,
}

const Map = () => {
  const [type, setType] = useState(null)
  const [locationInfo, setLocationInfo] = useState(null)
  const [locationInfoRainfall, setLocationInfoRainfall] = useState(null)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })

  const onChange = (value) => {
    setType(value)
  }

  const { data: marks, isFetching } = useGetMapMarkersQuery({ skip: !isLoaded })
  console.log("Map Markers, ", marks)
  const { data: rainfall, isFetching: fetchingRainfall } =
    useGetRainfallMarkersQuery()
  console.log("-- marks")
  console.log(marks, "-- marks")

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onClick={() => {
          setLocationInfo(null)
        }}
        onDrag={() => setLocationInfo(null)}
      >
        {!isFetching &&
          marks.features.map((mark, index) => {
            const point = mark.geometry.coordinates
            // console.log(point)
            const id = mark.id
            const atrisk = mark.properties.atrisk
            const name = mark.properties.name
            const value = mark.properties.value
            const value_date = mark.properties.value_date
            const river = mark.properties.river
            if (
              mark.properties.atrisk === true &&
              mark.properties.type === type
            ) {
              console.log("== mark point", point, "AND ", type)
              return (
                <Circle
                  key={index}
                  center={{ lng: point[0], lat: point[1] }}
                  radius={3000}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    radius: 2000,
                    zIndex: 1,
                    // strokeColor: "#006994",
                    // strokeOpacity: 0.8,
                    // strokeWeight: 2,
                    // fillColor: `#022F8E`,
                    // fillOpacity: 0.35,
                    // zIndex: 1
                  }}
                  onClick={() => {
                    console.log(
                      "=== mark point INDEX",
                      index,
                      name,
                      point,
                      "AND ",
                      type
                    )
                    setLocationInfo({
                      id,
                      type,
                      atrisk,
                      name,
                      value,
                      value_date,
                      river,
                      lat: point[0],
                      long: point[1],
                    })
                  }}
                />
              )
            } else if (
              mark.properties.atrisk === false &&
              mark.properties.type === type
            ) {
              return (
                <Circle
                  key={index}
                  center={{ lng: point[0], lat: point[1] }}
                  radius={1500}
                  options={{
                    strokeColor: "#006994",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: `#022F8E`,
                    fillOpacity: 0.35,
                    zIndex: 1,
                  }}
                  onClick={() => {
                    setLocationInfo({
                      id,
                      type,
                      atrisk,
                      name,
                      value,
                      value_date,
                      river,
                    })
                  }}
                />
              )
            }
          })}

        {!fetchingRainfall &&
          rainfall?.features.map((mark, index) => {
            const pointR = mark?.geometry?.coordinates

            const name = mark.properties.station_name
            const unit = mark.properties.units
            const oneHourTotal = mark.properties.one_hr_total
            const sixHourTotal = mark.properties.six_hr_total
            const dayTotal = mark.properties.day_total
            const date = mark.properties.value_timestamp
            if (type === "Rainfall") {
              if (mark.properties.day_total > 0) {
                return (
                  <Circle
                    key={index}
                    center={{ lng: pointR?.[0], lat: pointR?.[1] }}
                    radius={3000}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF0000",
                      fillOpacity: 0.35,
                      radius: 2000,
                      zIndex: 1,
                      // strokeColor: "#006994",
                      // strokeOpacity: 0.8,
                      // strokeWeight: 2,
                      // fillColor: `#022F8E`,
                      // fillOpacity: 0.35,
                      // zIndex: 1
                    }}
                    onClick={() => {
                      setLocationInfoRainfall({
                        name,
                        unit,
                        oneHourTotal,
                        sixHourTotal,
                        dayTotal,
                        date,
                      })
                    }}
                  />
                )
              } else {
                return (
                  <Circle
                    key={index}
                    center={{ lng: pointR?.[0], lat: pointR?.[1] }}
                    radius={1500}
                    options={{
                      strokeColor: "#006994",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: `#022F8E`,
                      fillOpacity: 0.35,
                      zIndex: 1,
                    }}
                    onClick={() => {
                      setLocationInfoRainfall({
                        name,
                        unit,
                        oneHourTotal,
                        sixHourTotal,
                        dayTotal,
                        date,
                      })
                    }}
                  />
                )
              }
            }
          })}

        <section className="google-key-type">
          <spam>Measurements:</spam>
          <Select
            showSearch
            placeholder="Select a type"
            optionFilterProp="children"
            onChange={onChange}
          >
            <Option value="S">River</Option>
            <Option value="G">Groundwater</Option>
            <Option value="C">Tidal</Option>
            <Option value="Rainfall">Rainfall</Option>
          </Select>
        </section>
      </GoogleMap>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
      {locationInfoRainfall && (
        <LocationInfoBoxRainfall info={locationInfoRainfall} />
      )}
    </div>
  ) : (
    <Loader />
  )
}

export default Map
