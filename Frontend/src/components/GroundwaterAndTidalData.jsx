import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetValueFromStationReferenceQuery, useGetValueStatFromStationReferenceQuery} from "../services/floodApi";
import Loader from "./Loader";
const { Text, Title } = Typography;
const { Option } = Select;

const   GroundwaterAndTidalData = (props) => {

  let {
    data: selectedStationRef, isFetching: fetchingValueInformation,
  } = useGetValueFromStationReferenceQuery(props.item.stationReference);

  let {
    data: selectedStationStatRef, isFetching: fetchingValueStatInformation,
  } = useGetValueStatFromStationReferenceQuery(props.item.stationReference);

  if (fetchingValueInformation && fetchingValueStatInformation) {
    return <Loader/>;
  } else {
    const dataLength = selectedStationRef?.items?.length
    let range = 'N/A';
    let dateTime = 'N/A';
    let parameterName = 'Water Level';
    let rangeStr = 'Data not available';

    if (dataLength !== 0) {
      for (let i = 0; i < dataLength; i++) {
        if (selectedStationRef.items[i].latestReading) {
          range = selectedStationRef.items[i].latestReading.value;
          dateTime = selectedStationRef?.items[i].latestReading?.dateTime;
          parameterName = selectedStationRef?.items[i]?.parameterName;
          break;
        }
      }
// console.log(selectedStationStatRef)
      rangeStr = 'normal';
      // if (range < props.item.stageScale.typicalRangeLow) {
      //   rangeStr = 'low';
      // } else if (range > props.item.stageScale.typicalRangeHigh) {
      //   rangeStr = 'high';
      // }
    }

    return (
      <Col xs={24} sm={12} lg={8} key={props.index}>
      <Card hoverable className="news-card">

          <div>
            <Title className="news-title" level={4}>{props.item.label}</Title>
          </div> <br></br>

          <div> 
            <h3>{parameterName}: {range}m</h3> <br></br>
            <h3> Status: {rangeStr}</h3> <br></br>
            <Text>Updated {dateTime?.slice(11,16) || null}, {dateTime?.slice(0,10) || null}</Text>
          </div>          
          
        
      </Card>
    </Col> 
    
    );
  }
}
export default GroundwaterAndTidalData;