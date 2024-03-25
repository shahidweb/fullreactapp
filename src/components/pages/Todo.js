import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodo } from '../../store/todoSlice'
import AddEditTodo from '../modules/todo/AddEditTodo'
import TodoItem from '../modules/todo/TodoItem'
import todoService from '../services/todoService'

function Todo() {
  const todo = useSelector((state => state.todo))
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      const res = await todoService.get();
      dispatch(getTodo(res.data))
    }
    if (!todo.isGetApi) getTodos();
  }, [dispatch, todo.isGetApi])

  return (
    <div className="container mx-auto max-w-screen-xl pt-5">
      <div className='grid grid-cols-4 gap-4'>
        {todo.data && todo.data.map((item, i) => (
          <TodoItem key={item._id} {...item} />
        ))}
      </div>
      {todo.data.length === 0 && <div className='mx-auto max-w-screen-xl p-5 text-orange-700'>No Found Data!</div>}
      <AddEditTodo />
    </div>
  )
}

export default Todo
