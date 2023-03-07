import { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './components/Todo'
import { db } from './firebase'
import { query, collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'

import { Toaster, toast } from 'sonner';

const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
    container: `bg-slate-500 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mt-6`,
    heading: `text-3xl font-bold text-center text-white p-4`,
    form: `flex justify-between`,
    input:`border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-green-400 text-slate-100`,
    count: `text-center p-2 font-semibold text-slate-100 mt-4`
}

function App() {

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')


    // Create TODO
    const createTodo = async(e) => {
        e.preventDefault()
        if(input === '' ) {
            // TODO add toast
            (toast.error('Describe todo'))
            return
        }

    await addDoc(collection(db, 'todos'), {
        text: input,
        completed: false,
    })
    .then(toast.success('ToDo Added'))
    setInput('')
    }

    // Read todo from Firebase
    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
            })
            setTodos(todosArr)
        }) 
        return() => unsubscribe()
    }, [])
    
    // Update todo in Firebase
    const toggleComplete = async(todo) => {
        (toast.success('To do finished successfully'))
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    }

    // delete todo
    const deleteTodo = async(id) => {
        await deleteDoc(doc(db, 'todos', id))
            .then(toast.error('ToDo removed successfully'))
    }

  return (
    <div className={style.bg}>
        <div className={style.container}>
        
            <h3 className={style.heading}>ToDo App</h3>
            <form 
                onSubmit={createTodo}
                className={style.form}
            >
                <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder="Add Todo" />
                <button className={style.button}><AiOutlinePlus size={30}/> </button>
            </form>
            <ul>
                {todos.map((todo, i)=> (
                    <Todo 
                        key={i} 
                        todo={todo} 
                        toggleComplete={toggleComplete} 
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
            {todos.length < 1 
                ? <p className={style.count}>Start adding ToDo</p>
                :  <p className={style.count}>{`You Have ${todos.length} ToDos`}</p>
            }
           
        </div>
        <Toaster closeButton />
       
    </div>
  )
}

export default App
