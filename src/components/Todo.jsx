import { FaRegTrashAlt } from 'react-icons/fa'
import { useState } from 'react';


const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2`,
    row: `flex `,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`
}

const Todo = ({ todo, toggleComplete, deleteTodo}) => {
    const [checked, setChecked] = useState(false)
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
        <div className={style.row}>
            <input onChange={ ()=> toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''}/>
            <p onClick={ () => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
        </div>
        <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt/>}</button>
    </li>
  )
}

export default Todo