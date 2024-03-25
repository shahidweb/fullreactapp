import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, getTodo } from '../../store/todoSlice'
import AddEditTodo from '../modules/todo/AddEditTodo'
import TodoItem from '../modules/todo/TodoItem'
import todoService from '../services/todoService'
import { toast } from 'react-toastify'

function Todo() {
  const todo = useSelector((state => state.todo))
  const dispatch = useDispatch();
  const [data, setData] = useState()

  useEffect(() => {
    const getTodos = async () => {
      const res = await todoService.get();
      dispatch(getTodo(res.data))
    }
    if (!todo.isGetApi) getTodos();
  }, [dispatch, todo.isGetApi])

  const onEventHandler = async (id, type) => {
    if (type === 'delete') {
      try {
        const res = await todoService.delete(id);
        if (res.success) {
          dispatch(deleteTodo(id))
          toast.success(res.message);
        } else console.log(res)
      } catch (error) {
        toast.error(error.message)
      }
    } else if (type === 'edit') {
      const data = todo.data.find(item => item._id === id)
      setData(data)
    }
  }

  return (
    <div className="container mx-auto max-w-screen-xl pt-5">
      <div className='grid grid-cols-4 gap-4'>
        {todo.data && todo.data.map((item, i) => (
          <TodoItem key={item._id} {...item} onEventHandler={onEventHandler} />
        ))}
      </div>
      {todo.data.length === 0 && <div className='mx-auto max-w-screen-xl p-5 text-orange-700'>No Found Data!</div>}
      <AddEditTodo edit={data} closeHandler={() => setData({})} />
    </div>
  )
}

export default Todo
