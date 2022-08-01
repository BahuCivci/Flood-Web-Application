import {
  createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseUrl = "https://check-for-flooding.service.gov.uk/api/stations.geojson";
const createRequest = (url) => ({ url });

export const mapData = createApi({
  reducerPath: 'mapData',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getMapMarkers: builder.query({
      query: () => createRequest(''),
    }),
  }),
});

export const {
  useGetMapMarkersQuery,
} = mapData;