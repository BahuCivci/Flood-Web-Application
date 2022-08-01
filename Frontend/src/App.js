import React, { useEffect, useState } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Layout, Typography, Space, Row, Col } from "antd"
import { Navbar, Map, HomePage, Login, Register } from "./components/"
import "./App.css"
import { useLocation } from "react-router-dom"
import UpdateProfile from "./components/UpdateProfile"

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // Get URL pathname
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      location && navigate(location.pathname)
    }
  }, [])
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/update-profile" element={<UpdateProfile />} />
              <Route exact path="/map-view" element={<Map />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            this uses Environment Agency flood and river level data from the
            real-time data API (Beta)
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
