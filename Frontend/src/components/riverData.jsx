import React, { useEffect, useState } from "react"
import { Select, Typography, Row, Col, Avatar, Card } from "antd"
import { useGetValueFromStationReferenceQuery } from "../services/floodApi"
import axios from "axios"
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux"
import {
  setContent,
  setFloodAlert,
  setNotification,
  setStations,
} from "../app/slices/notificationSlice"
import { BASE_URL } from "../constants/utils"
const { Text, Title } = Typography
const { Option } = Select

const RiverLabelData = (props) => {
  // API Calls
  let { data: selectedStationRef, isFetching: fetchingValueInformation } =
    useGetValueFromStationReferenceQuery(props.item.stationReference)

  // Redux State
  const { sent, content, stations, floodAlert } = useSelector(
    (state) => state.notification
  )
  const dispatch = useDispatch()
  // States
  const [stationDetails, setStationDetails] = useState(null)
  const [rangeStatus, setRangeStatus] = useState(null)
  const [notificationSent, setNotificationSent] = useState(false)
  const [notificationContent, setNotificationContent] = useState(null)

  // Update Notification Content
  useEffect(() => {
    if (!content && floodAlert) {
      console.log(stationDetails, "== notify user")
      dispatch(
        setContent({
          ...stationDetails,
          rangeStatus: rangeStatus,
          label: props.river,
        })
      )
    }
  }, [floodAlert])

  // Sending Notification
  const notifyUser = async () => {
    setNotificationSent(true)
    console.log(content, " == notify user")
    console.log("== Me chl gya notify user")
    dispatch(setNotification(true))
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const newStations = [...new Set(stations)]
      const myContent = {
        ...content,
        stations: newStations,
      }
      const response = await axios.post(
        `${BASE_URL}notification/send-alert`,
        myContent,
        config
      )
      // Remove duplicate stations

      // console.log("Data from redux", myContent)
      alert(response.data.msg)
      console.log(response, "== response")
    } catch (error) {
      console.log(error, "== response")
    }
  }

  // Send Notification when value is above threshold and not sent yet
  useEffect(() => {
    if (
      content &&
      props.lastIndex === props.currentIndex &&
      props.lastOne &&
      !fetchingValueInformation
    ) {
      if (!sent && floodAlert) {
        console.log(
          "== Data from redux last one Checking prop: ",
          props.lastOne
        )
        console.log("== data from redux ", sent)
        notifyUser()
      }
    }
  })

  // Check if value is above threshold
  useEffect(() => {
    if (fetchingValueInformation) {
      return <Loader />
    } else {
      const dataLength = selectedStationRef.items.length
      console.log("== Data length: ", dataLength)
      let range = "N/A"
      if (dataLength !== 0) {
        for (let i = 0; i < dataLength; i++) {
          if (selectedStationRef.items[i].latestReading) {
            console.log("Parameter Name from undefiend", props.item.label)
            setStationDetails({
              stationName: props.item.label,
              // parameterName: selectedStationRef.items[i].parameterName,
              parameterName: selectedStationRef.items[i].parameterName
                ? selectedStationRef.items[i].parameterName
                : "Water Level",
              range: selectedStationRef.items[i].latestReading.value,
              dateTime: selectedStationRef.items[i].latestReading.dateTime,
            })
            // range = selectedStationRef.items[i].latestReading.value
            console.log(
              "== Parameter Name: ",
              selectedStationRef.items[i].parameterName
            )
            range = selectedStationRef.items[i].latestReading.value
            break
          }
        }
        setRangeStatus("normal")
        if (range < props.item.stageScale.typicalRangeLow) {
          setRangeStatus("low")
        } else if (range > props.item.stageScale.typicalRangeHigh) {
          setRangeStatus("high")
          dispatch(setStations(selectedStationRef.items[0].label.split("-")[0]))
          dispatch(setFloodAlert(true))
        }
      }
    }
  }, [fetchingValueInformation])

  return (
    // <div key={props.index}>
    //   <span>
    //     {props.item.label}
    //   </span>
    //   {'          '}
    //   <span>{range}</span>
    //   {'          '}
    //   <b>{rangeStr}</b>
    // </div>

    <Col xs={24} sm={12} lg={8} key={props.index}>
      {fetchingValueInformation ? (
        <Loader />
      ) : (
        <Card hoverable className="news-card">
          <div>
            <Title className="news-title" level={4}>
              {props.item.label}
            </Title>
          </div>{" "}
          <br></br>
          <div>
            <h3>
              {stationDetails?.parameterName
                ? stationDetails.parameterName + " : "
                : "Water Level : "}
              {stationDetails?.range ? stationDetails?.range + "m" : "N/A"}
              {/* Station: {stationDetails?.stationName} */}
              {/* {stationDetails ? stationDetails.parameterName : "N/A"}:{" "}
              {stationDetails ? stationDetails.range : "N/A"} */}
            </h3>{" "}
            <br></br>
            <h3>
              {" "}
              Status :{" "}
              {stationDetails?.parameterName
                ? rangeStatus
                : "Data not available"}
            </h3>
            {/* <h3> Status: {rangeStr}</h3> <br></br> */}
            <Text>
              {/* Updated {dateTime?.slice(11, 16) || null},{" "}
              {dateTime?.slice(0, 10) || null} */}
              {/* {"Updated" + stationDetails?.dateTime?.slice(11, 16)} */}
              {/* // {dateTime?.slice(0, 10) || null} */}
              Updated :{" "}
              {stationDetails?.parameterName
                ? stationDetails?.dateTime?.slice(11, 16) || null
                : "Data not available"}
              , {stationDetails?.dateTime?.slice(0, 10) || null}
            </Text>
          </div>
        </Card>
      )}
    </Col>
  )
}

export default RiverLabelData
