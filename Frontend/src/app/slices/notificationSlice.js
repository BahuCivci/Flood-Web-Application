import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    floodAlert: false,
    sent: false,
    content: null,
    stations: [],
  },
  reducers: {
    setFloodAlert: (state, action) => {
      state.floodAlert = action.payload
    },
    setNotification: (state, action) => {
      state.sent = action.payload
    },
    setContent: (state, action) => {
      console.log("Payload notify user", action.payload)
      state.content = action.payload
    },
    setStations: (state, action) => {
      console.log("Data from redux dispatch", action.payload)
      state.stations.push(action.payload)
    },
    setStationsNull: (state, action) => {
      state.stations = []
    },
  },
})

export const {
  setNotification,
  setContent,
  setStations,
  setFloodAlert,
  setStationsNull,
} = notificationSlice.actions

export default notificationSlice.reducer
