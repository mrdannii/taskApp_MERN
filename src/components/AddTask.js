import React, { useContext, useState } from "react";
import taskContext from "../context/tasks/taskContext";

export default function AddTask() {
  const context = useContext(taskContext);
  const { addTask } = context;

  const [task, settask] = useState({ title: "", description: "", tag: "" });
  const handleClick = () => {
    addTask(task.title, task.description, task.tag);
    settask({title: "", description: "", tag: ""})

  };
  const handleChange = (e) => {
    settask({ ...task, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-4">
        <h3>Create a New Task</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleChange}
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
              id="description"
              rows="1"
              name="description"
              onChange={handleChange}
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
              name="tag"
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={handleClick}
            >
              Save it
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
