import React, { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/utils"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])

  const loginUser = async (event) => {
    event.preventDefault()

    const body = {
      email,
      password,
    }
    try {
      const response = await axios.post(BASE_URL + "user/login", body)
      localStorage.setItem("token", response.data.token)
      alert("Login successful")
      navigate("/map-view")
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />{" "}
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />{" "}
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
