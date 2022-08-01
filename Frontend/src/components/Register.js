import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../constants/utils"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])

  const registerUser = async (event) => {
    event.preventDefault()
    const body = {
      name,
      email,
      password,
    }
    try {
      const response = await axios.post(BASE_URL + "user/register", body)
      localStorage.setItem("token", response.data.token)
      alert("Register successful")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />{" "}
        <br />
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
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Register
