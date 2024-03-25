import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteTodo, selectEditTodo } from '../../../store/todoSlice';
import Button from '../../UI/Button';
import todoService from '../../services/todoService';

function TodoItem(props) {
    const { title, description, _id, } = props;
    const dispatch = useDispatch();

    const onDelete = async (id) => {
        try {
            const res = await todoService.delete(id);
            if (res.success) {
                dispatch(deleteTodo(id))
                toast.success(res.message);
            } else console.log(res)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div key={_id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description ? description : "Some description about above topic"}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <Button onClick={() => dispatch(selectEditTodo(_id))}>Edit</Button>
                <Button isPrimary={true} onClick={() => onDelete(_id)}>Delete</Button>
            </div>
        </div>
    )
}

export default TodoItem;
