import React, { useContext } from 'react'
import taskContext from "../context/tasks/taskContext"

export default function TaskItems(props) {
  const context = useContext(taskContext);
  const { deleteTask } = context;
  const {task , updateTask} = props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
  <div className="card-body">
  <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
    {task.tag}
    <span className="visually-hidden">New alerts</span>
  </span>
    <h5 className="card-title">{task.title} </h5>
    {/* s<h6 className="card-subtitle mb-2 text-body-secondary"> <small><span className="badge text-bg-warning">{task.tag}</span></small></h6> */}
    <p className="card-text">{task.description}</p>
    {/* <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a> */}

    <div className='d-flex justify-content-evenly'>
    <i className="fa-solid fa-pen-to-square" onClick={ ()=> updateTask(task)}></i>
    <i className="fa-sharp fa-solid fa-trash" onClick={()=>{deleteTask(task._id)}}></i>
    </div>
  </div>
</div>
    </div>
  )
}
