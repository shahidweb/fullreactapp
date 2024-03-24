import React from 'react';
import Button from '../../UI/Button';

function TodoItem(props) {
    if (!props.title) return;

    const { title, description, _id, } = props; //isComplete, createdAt
    const onEventHandler = props.onEventHandler

    return (
        <div key={_id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description ? description : "Some description about above topic"}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <Button onClick={() => onEventHandler(_id, 'edit')}>Edit</Button>
                <Button isPrimary={true} onClick={() => onEventHandler(_id, 'delete')}>Delete</Button>
            </div>
        </div>
    )
}

export default TodoItem;
