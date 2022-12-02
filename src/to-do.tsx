
import axios from "axios";
import {useEffect, useState} from "react"

interface ToDoInterface {
    id: number;
    message: string
}
export default function ToDo (): JSX.Element {
    const [allTasks, setAllTasks] = useState<ToDoInterface[]>([])
    const [toDoItem, setToDoItem] = useState<string>("")
    const [completedTasks, setCompletedTasks] = useState<ToDoInterface[]>([])

 
    
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

    useEffect (() => {
        const fetchAPI = async () => {
            //using axios to fetch the API, using a get command, assigning the vraible 'response' to theAPI info
            const response = await axios.get("https://todo-backend-bfou.onrender.com/completed");
            // assigning fetchedTasks to the API data, specifically data
            const fetchedCompletedTasks = response.data;
            // sets tasks to the data
            setCompletedTasks(fetchedCompletedTasks)
            console.log("fetched completed")
        };  
        fetchAPI()
    }, [completedTasks])


    const handleAddItem = async (item: string) => {
        const response = await axios.post("https://todo-backend-bfou.onrender.com/items", {message: item});
        console.log(response)
    }

    const handleDeleteItem = async (number: number) => {
        const response = await axios.delete(`https://todo-backend-bfou.onrender.com/items/${number}`, {data: {id: number}});
        console.log(response)
        console.log([...allTasks], `instructed to delete ${number}` )
    }
    
    const handleCompletedItem = async (number: number, message: string) => {
        await axios.delete(`https://todo-backend-bfou.onrender.com/items/${number}`, {data: {id: number}});
        const response = await axios.post("https://todo-backend-bfou.onrender.com/completed", {message});
        console.log(response);
        console.log(`${number}`)
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
               {allTasks.map((item: ToDoInterface) => (
       <li key ={item.id} >{item.message} 
       <button onClick = {() => handleDeleteItem(item.id)} >🗑️</button>
       <button onClick = {() => handleCompletedItem(item.id, item.message)} >✅</button>
        </li>))} 
    </ul>
    <p> Your completed tasks:</p>
    <ul>{completedTasks.map((item: ToDoInterface, index)=> (
        <li key = {item.id}>{item.message}</li>))}
    </ul>
        </div>
        </>
    )

}