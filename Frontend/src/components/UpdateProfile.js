import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../constants/utils"
import { Select } from "antd"
import { useDispatch } from "react-redux"
import {
  useGetStationRiverNameQuery,
  useGetValueFromStationReferenceQuery,
  useGetStationByQualifierQuery,
} from "../services/floodApi"
import Loader from "./Loader"

const { Option } = Select

const UpdateProfile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userWorkLocation, setUserWorkLocation] = useState("")

  const [river, setRiver] = useState("")
  const [allRivers, setAllRivers] = useState(new Set())

  let { data: selectedRiver, isFetching: fetchingRiverInformation } =
    useGetStationRiverNameQuery(river, { skip: river === "" })

  const { data: stationInfoFromRiver, isFetching } =
    useGetStationRiverNameQuery("")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  })

  const updateProfile = async (event) => {
    event.preventDefault()
    const body = {
      name,
      email,
      password,
    }
    try {
      const response = await axios.post(
        `${BASE_URL}user/update-work-location`,
        {
          workLocation: userWorkLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert("Update successful")
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (value) => {
    setUserWorkLocation(value)
    console.log(value)
  }

  const onSearch = (value) => {
    console.log("search:", value)
  }
  useEffect(() => {
    console.log("All rivers", allRivers)
  }, [allRivers])

  const getWorkLocation = async () => {
    try {
      const response = await axios.get(`${BASE_URL}user/work-location`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserWorkLocation(response.data.workLocation)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWorkLocation()
  }, [])

  if (isFetching) {
    return <Loader />
  } else if (allRivers.size === 0) {
    let rivers = new Set()
    stationInfoFromRiver?.items.map((item, index) => {
      if (item.riverName !== undefined) {
        rivers.add(item.riverName)
      }
    })
    setAllRivers(rivers)
  }

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={updateProfile}>
        <label>River near to Workplace :</label>
        {allRivers.size > 0 && (
          <Select
            showSearch
            placeholder="Select a river"
            value={userWorkLocation && userWorkLocation}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            listHeight={330}
          >
            {Array.from(allRivers).map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        )}
        <br />

        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  )
}

export default UpdateProfile
