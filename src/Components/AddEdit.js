import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AddEdit = ({creation}) => {

  const [loadingStatus, setLoadingStatus] = useState(false)

  const submitForm = (e) => {
    e.preventDefault()

    if (email == "" || password == "")
      return alert("Enter Email & password")
      setLoadingStatus(true)
    const options = {
      method: "post",
      url: "http://localhost:7000/api/users/login",
      data: ({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        Authorization: 'Bearer'
      }
    }
    //axios.defaults.withCredentials = true
    const response = axios(options)
      .then((response) => {
        const data = response.data
        if (data.status == "Success") {
          setLoadingStatus(false)
          navigate("/dashboard",{state:data.data})
        }

      })
      .catch((error) => {
        setLoadingStatus(false)
        console.log(error)
        alert(error.response.data.msg)
      })


  }

  return (
<>
<form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="taskTitle">Title</label>
      <input type="text" class="form-control" id="taskTitle" placeholder="Enter title"/>
    </div>
    <div class="form-group col-md-6">
      <label for="taskDescription">Description</label>
      <input type="text" class="form-control" id="taskDescription" placeholder="enter description" />
    </div>
  </div>
  <div class="form-group">
    <label for="taskPriority">Priority</label>
    <input type="text" class="form-control" id="taskPriority" placeholder="Priority: High, Medium ,Low" />
  </div>
  <div class="form-group">
    <label for="taskStatus">Status</label>
    <input type="text" class="form-control" id="taskStatus" placeholder="Status: Completed, Pending" />
  </div>

  <button type="submit" class="btn btn-primary">{creation?'Add Task':'Update Task'}</button>
</form>
    </>
  )
}

export default AddEdit