// const options = {
//     method: 'GET',
//     url: 'https://environment.data.gov.uk/flood-monitoring/id/stations',
//     params: {_limit: '10?_limit=10'}
//   };
  
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Note: Change v1 to v2 on rapid api

const floodApiHeaders = {
    params: {_limit: '?_limit=10'}
};

const baseUrl = "https://environment.data.gov.uk/flood-monitoring";
const createRequest = (url) => ({ url });

export const floodApi = createApi({
  reducerPath: 'floodApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getStations: builder.query({
      query: () => createRequest(`/id/stations`),
    }),

    getMeasures: builder.query({
      query: () => createRequest(`/id/measures`),
    }),

    getValueFromStationReference: builder.query({
      query: (stationReference) => createRequest(`/id/measures?stationReference=${stationReference}`),
    }),

    getValueStatFromStationReference: builder.query({
      query: (stationReference) => createRequest(`/id/measures?stationReference=${stationReference}/stageScale`),
    }),

    getStationRiverName: builder.query({
      query: (riverName) => createRequest(`/id/stations?riverName=${riverName}&_view=full`),
    }),   

    getStationAroundYou: builder.query({
      query: ({lat,long, dist}) => createRequest(`/id/stations?lat=${lat}&long=${long}&dist=${dist}`),
    }),

    getStationByQualifier: builder.query({
      query: (qualifer) => createRequest(`/id/stations?qualifier=${qualifer}`),
    }),  
  }),
});
export const {
  useGetStationsQuery,
  useGetStationRiverNameQuery,
  useGetMeasuresQuery,
  useGetStationAroundYouQuery,
  useGetValueFromStationReferenceQuery,
  useGetStationByQualifierQuery,
  useGetValueStatFromStationReferenceQuery
} = floodApi;