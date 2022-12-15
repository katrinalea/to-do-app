import axios from "axios";
import { useEffect, useState } from "react";

interface ToDoInterface {
  id: number;
  message: string;
  date: Date;
  completed: boolean
}
export default function ToDo(): JSX.Element {
  const [allTasks, setAllTasks] = useState<ToDoInterface[]>([]);
  const [toDoItem, setToDoItem] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ToDoInterface[]>([]);
  const [textChange, setTextChange] = useState<string | null>("")
  console.log(completedTasks, "completed tasks", typeof completedTasks, Array.isArray(completedTasks))
  
  useEffect(() => {
    const fetchAPI = async () => {
      //using axios to fetch the API, using a get command, assigning the vraible 'response' to theAPI info
      // const response = await axios.get(
      //   "https://todo-backend-bfou.onrender.com/items"
      // );
      const response = await axios.get(
        "http://localhost:4000/items"
      );
      // assigning fetchedTasks to the API data, specifically data
      const fetchedWholeObject = response.data;
      const fetchedTasks = fetchedWholeObject.data;
      // sets tasks to the data
      setAllTasks(fetchedTasks); 
    };
    fetchAPI();
  }, [allTasks]);

  // fetches from the completed api everytime completed tasks is updated
  useEffect(() => {
    const fetchAPI = async () => {
      //using axios to fetch the API, using a get command, assigning the vraible 'response' to theAPI info
      // const response = await axios.get(
      //   "https://todo-backend-bfou.onrender.com/completed"
      // );
      const response = await axios.get(
        "http://localhost:4000/completed"
      );
      // assigning fetchedTasks to the API data, specifically data
      const fetchedWholeObject = response.data;
      const fetchedCompletedTasks = fetchedWholeObject.data;
      console.log(fetchedCompletedTasks, "completed")
      // sets tasks to the data
      setCompletedTasks(fetchedCompletedTasks);
      
    };
    fetchAPI();
  }, [completedTasks]);

  //adds an item to the all items api
  const handleAddItem = async (item: string) => {
    const response = await axios.post(
      "https://todo-backend-bfou.onrender.com/items",
      {message: item, completed: 'false'}
    );
    // const response = await axios.post(
    //   "http://localhost:4000/items",
    //   {message: item, completed: 'false'}
    // );
    console.log("adding item " + item)
    console.log(response);
    setToDoItem("");
  };

  // deletes the item from the all items api
  const handleDeleteItem = async (number: number) => {
    await axios.delete(
      `https://todo-backend-bfou.onrender.com/items/${number}`,
      { data: { id: number } }
    );
    // await axios.delete(
    //   `http://localhost:4000/items/${number}`,
    //   {data: {id: number}}
    // );
  };

  // deleting the task from the all items api, then posts to the completed api
  const handleCompletedItem = async (number: number) => {
    await axios.patch(`https://todo-backend-bfou.onrender.com/items/${number}`,
    {id: number})
    // await axios.patch(`http://localhost:4000/items/${number}`,
    // {id: number})
  };

  const handleRefreshCompleted = async () => {
    // await axios.delete("https://todo-backend-bfou.onrender.com/completed")
    await axios.delete("http://localhost:4000/completed");
  }; //working

  const editTaskItem = async (id: number, textChange: string | null) => {
    await axios.patch(`https://todo-backend-bfou.onrender.com/items/${id}`,
    {message: textChange})
    // await axios.patch(`http://localhost:4000/items/update/${id}`,
    // {message: textChange})
  } // complete patch request

  return (
    <>
      <div className="page">
        <h1> To Do List</h1>
        <input
          id="input"
          className="addbar"
          type="text"
          onChange={(e) => setToDoItem(e.target.value)}
          value={toDoItem}
        />
        <button className="button" onClick={() => handleAddItem(toDoItem)}>
          {" "}
          Submit
        </button>
        <hr />
        <h3> This is what you need to do today:</h3>
        <ul className="list">
          <>
          {allTasks && allTasks.map((item: ToDoInterface) => (
            <li key={item.id} contentEditable = 'true' onChange={(e) => setTextChange(e.currentTarget.textContent)}>
              {item.message}
              <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
              <button
                onClick={() => handleCompletedItem(item.id)}
              >
                ✅
              </button>
              <button onClick={() => editTaskItem(item.id, textChange)}>🖊️</button>
            </li>
          ))}
          </>
        </ul>
        <hr />
        <h3> Your completed tasks:</h3>
        <ul className="list">
          <>
          {completedTasks && completedTasks.map((item: ToDoInterface) => (
            <li key={item.id}>{item.message}</li>
          ))}
          </>
        </ul>
        <button className="button" onClick={handleRefreshCompleted}>
          {" "}
          Refresh completed list{" "}
        </button>
      </div>
    </>
  );
}
