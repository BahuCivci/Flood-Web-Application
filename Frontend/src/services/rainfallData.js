import {
    createApi, fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  
  const baseUrl = "https://check-for-flooding.service.gov.uk/api/rainfall.geojson";
  const createRequest = (url) => ({ url });
  
  export const rainfallData = createApi({
    reducerPath: 'rainfallData',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
      getRainfallMarkers: builder.query({
        query: () => createRequest(''),
      }),
    }),
  });
  
  export const {
    useGetRainfallMarkersQuery,
  } = rainfallData;