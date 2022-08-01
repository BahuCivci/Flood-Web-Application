import { configureStore } from "@reduxjs/toolkit"
// import { setupListeners } from '@reduxjs/toolkit/query'

import { floodApi } from "../services/floodApi"
import { mapData } from "../services/mapData"
import { rainfallData } from "../services/rainfallData"
import notificationSlice from "./slices/notificationSlice"

export default configureStore({
  reducer: {
    [floodApi.reducerPath]: floodApi.reducer,
    [mapData.reducerPath]: mapData.reducer,
    [rainfallData.reducerPath]: rainfallData.reducer,
    notification: notificationSlice,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      floodApi.middleware,
      mapData.middleware,
      rainfallData.middleware,
    ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(configureStore.dispatch)
