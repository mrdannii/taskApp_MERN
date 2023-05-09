import React, { useContext, useEffect, useRef, useState } from "react";
import taskContext from "../context/tasks/taskContext";
import TaskItems from "./TaskItems";
import AddTask from "./AddTask";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  let navigate= useNavigate();
  const context = useContext(taskContext);
  const { tasks, getTasks, editTask } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getTasks();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);

  const [task, settask] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const updateTask = (currentTask) => {
    ref.current.click();
    settask({
      id:currentTask._id,
      etitle: currentTask.title,
      edescription: currentTask.description,
      etag: currentTask.tag,
    });
  };
  const handleClick = () => {
    refclose.current.click();
    editTask(task.id, task.etitle, task.edescription, task.etag);
    //console.log(task);

  };
  const handleChange = (e) => {
    settask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddTask />
      <button
        hidden
        type="button"
        ref={ref}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="etitle"
                    onChange={handleChange}
                    value={task.etitle}
                  />
                  {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    rows="3"
                    name="edescription"
                    onChange={handleChange}
                    value={task.edescription}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="etag"
                    onChange={handleChange}
                    value={task.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}

              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Tasks</h3>
        {tasks.map((task) => {
          return <TaskItems key={task._id} task={task} updateTask={updateTask} />;
        })}
      </div>
    </div>
  );
}
