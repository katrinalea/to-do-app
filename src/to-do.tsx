
import axios from "axios";
import {useEffect, useState} from "react"

interface ToDoInterface {
    id: number;
    message: string
}
export default function ToDo (): JSX.Element {
    const [allTasks, setAllTasks] = useState<ToDoInterface[]>([])
    const [toDoItem, setToDoItem] = useState<string>("")

 
    
    useEffect (() => {
        const fetchAPI = async () => {
            //using axios to fetch the API, using a get command, assigning the vraible 'response' to theAPI info
            const response = await axios.get("https://todo-backend-bfou.onrender.com/items");
            // assigning fetchedTasks to the API data, specifically data
            const fetchedTasks = response.data;
            // sets tasks to the data
            setAllTasks(fetchedTasks)
        };  
        fetchAPI()
    }, [allTasks])

    const handleAddItem = async (item: string) => {
        const response = await axios.post("https://todo-backend-bfou.onrender.com/items", {message: item});
        console.log(response)
    }
        
     
    
// our toDo input  wants to assign a message

    return (
        <>
        <div className = "page">
        <h1> To Do List</h1>
        <input type = "text"  placeholder = "Input a ToDo item" onChange = {(e) => setToDoItem(e.target.value)}/>
        <button onClick = {() => handleAddItem(toDoItem)}> Submit</button>
        <p> This is what you need to do:</p>
            <ul>
               {allTasks.map((item: ToDoInterface, index: number) => (
       <li key ={index} >{item.id}{item.message}</li>))}
    </ul>
        </div>
        </>
    )

}