import React, { useState, useEffect } from "react"
import { Button, Menu, Typography, Avatar } from "antd"
import { Link } from "react-router-dom"
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons"

import icon from "../images/environmentimage.jpg"
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(undefined)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Flood</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu &&
        (token ? (
          <>
            <Menu theme="dark">
              <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item icon={<UserAddOutlined />}>
                <Link to="/update-profile">Update Profile</Link>
              </Menu.Item>
              <Menu.Item icon={<LogoutOutlined />}>
                <Link
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault()
                    localStorage.removeItem("token")
                    window.location.reload()
                  }}
                >
                  Logout
                </Link>
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <>
            <Menu theme="dark">
              <Menu.Item icon={<HomeOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item icon={<LogoutOutlined />}>
                <Link to="/register">Register</Link>
              </Menu.Item>
            </Menu>
          </>
        ))}
    </div>
  )
}

export default Navbar
