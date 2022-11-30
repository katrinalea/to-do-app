
import axios from "axios";
import {useEffect, useState} from "react"

interface ToDoInterface {
    id: number;
    message: string
}
export default function ToDo (): JSX.Element {
    const [allTasks, setAllTasks] = useState<ToDoInterface[]>([])

 
    
    useEffect (() => {
        const fetchAPI = async () => {
            const response = await axios.get("https://todo-backend-bfou.onrender.com/items");
            setAllTasks(response.data)
        };  
        console.log(allTasks)
        fetchAPI()
    }, [])

    console.log({allTasks})

   
    


    return (
        <>
        <div className = "page">
        <h1> To Do List</h1>
        <input type = "text"  placeholder = "Input a ToDo item"/>
        <p> This is what you need to do:</p>
        <p> 
            <ul>
               {allTasks.map((item: ToDoInterface, index: number) => (
       <li key ={index} >{item.id}</li>))}
    </ul>

        
        
    </p>
        </div>
        </>
    )

}