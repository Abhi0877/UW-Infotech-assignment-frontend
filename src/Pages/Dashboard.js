import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Modal, Button, Form } from "react-bootstrap";
const LogIn = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("")
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [tasks,setTasks] = useState([])
  const [show, setShow] = useState(false);
  const [isCreation,setIsCreation] = useState(true)
  const [getNewTask,setGetNewTask]= useState(0)
  const [taskId,setTaskId] =useState(null)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(()=>{
      setLoadingStatus(true)
    const options = {
      method: "get",
      url: "http://localhost:7000/api/tasks",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        Authorization: 'Bearer'
      }
    }

         axios(options)
      .then((response) => {
        const data = response.data
        if (data.status == "Success") {
          setLoadingStatus(false)
            setTasks(response.data.data)
            console.log('tasks',tasks, response.data.data)
        }

      })
      .catch((error) => {
        setLoadingStatus(false)
        console.log(error)
        alert(error.response.data.msg)
      })


  },[getNewTask])

  const editTask= (task)=> {
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority)
    setStatus(task.status)
    setIsCreation(false)
    setTaskId(task._id)
    handleShow()
  }

  const createTask = (e) => {
    e.preventDefault()

    if (title == "" || !description || !priority )
      return alert("Enter Required Fields ")
      setLoadingStatus(true)
    const options = {
      method: isCreation ? "post": "put",
      url: "http://localhost:7000/api/tasks",
      data: ({
        title: title,
        description,
        priority,
        status
      }),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        Authorization: 'Bearer'
      }
    }
    //axios.defaults.withCredentials = true
    if(isCreation) options.data.status='Pending'
    else  options.data.id= taskId
    const response = axios(options)
      .then((response) => {
        const data = response.data
        if (data.status == "Success") {
          setLoadingStatus(false)
          handleClose()
          setGetNewTask(getNewTask+1)
        }

      })
      .catch((error) => {
        setLoadingStatus(false)
        console.log(error)
        alert(error.response.data.msg)
        handleClose()
      })


  }

  const deleteTask = (e,id) => {
    e.preventDefault()

    setLoadingStatus(true)
    const options = {
      method: 'delete',
      url: "http://localhost:7000/api/tasks",
      data: ({
        id
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
          handleClose()
          setGetNewTask(getNewTask+1)
        }

      })
      .catch((error) => {
        setLoadingStatus(false)
        console.log(error)
        alert(error.response.data.msg)
        handleClose()
      })


  }

  return (
<>
    <div className='row mt-2 px-2   ' >
    <button  type="submit" className="btn btn-primary  taskBtn ml-2 col-md-2" onClick={()=> {setIsCreation(true);handleShow()}}>Add Task</button>
    <h3 className='mt-5'> Tasks: </h3>
    {(tasks.map((obj,index)=>{
       return <>
       <div className='task'>
       <p>Title: {obj.title}</p>
       <p>Description:  {obj.description }</p>
       <p>Status: {obj.status}</p>
       <div className='d-flex justify-content-end mb-2'>
       <button onClick={()=>{ editTask(obj)}} className="mx-2 btn btn-primary"> Edit Task</button>
       <button  onClick={(e)=>{  deleteTask(e,obj._id)}} className="mx-2 btn btn-danger">Delete Task</button>
       </div>
       </div>
       </>
    }))}

    </div>
    <div className='row '>

       </div>

    <Modal show={show}>
        <Modal.Header >
          <Modal.Title>AddEdit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          <form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="taskTitle">Title</label>
      <input type="text" className="form-control" id="taskTitle" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Enter title"/>
    </div>
    <div className="form-group col-md-6">
      <label for="taskDescription">Description</label>
      <input type="text" className="form-control" value={description} onChange={(e)=> setDescription(e.target.value)} id="taskDescription" placeholder="enter description" />
    </div>
  </div>
  <div className="form-group">
    <label for="taskPriority">Priority</label>
    <input type="text" className="form-control" value={priority} onChange={(e)=> setPriority(e.target.value)} id="taskPriority" placeholder="Priority: High, Medium ,Low" />
  </div>
 { isCreation ? <></> : <div className="form-group">
    <label for="taskStatus">Status</label>
    <input type="text" className="form-control"  value={status} onChange={(e)=> setStatus(e.target.value)} id="taskStatus" placeholder="Status: Completed, Pending" />
  </div>}

</form></>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close Modal</Button>
          <Button variant="primary" onClick={createTask}> {isCreation? 'Add Task': 'Update Task'}</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default LogIn