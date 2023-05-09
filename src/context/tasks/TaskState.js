import { useState } from "react";
import taskContext from "./taskContext";

const TaskState = (props) => {
  const host = "http://localhost:5000";
  const tasksinitials = [];
  const [tasks, settasks] = useState(tasksinitials);

  //get
  const getTasks = async () => {
    const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(data);
    settasks(json);
  };

  //ADD
  const addTask = async (title, description, tag) => {
    const response = await fetch(`${host}/api/tasks/addtask`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const x = await response.json();
    //console.log(x);

    settasks(tasks.concat(x));
  };

  //DELETE
  const deleteTask = async (id) => {
    console.log("delete" + id);
    const newTasks = tasks.filter((task) => {
      return task._id !== id;
    });
    const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    settasks(newTasks);
  };

  //EDIT
  const editTask = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    //console.log(json);

    let newtask = JSON.parse(JSON.stringify(tasks));
    for (let index = 0; index < tasks.length; index++) {
      const element = newtask[index];
      if (element._id === id) {
        newtask[index].title = title;
        newtask[index].description = description;
        newtask[index].tag = tag;
        break;
      }
    }
    settasks(newtask);
  };

  return (
    <taskContext.Provider
      value={{ tasks, getTasks, settasks, addTask, deleteTask, editTask }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
