import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTodo, editTodo, selectEditTodo } from '../../../store/todoSlice';
import { DialogBox, Input } from '../../UI';
import Button from '../../UI/Button';
import todoService from '../../services/todoService';


function AddEditTodo() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({ isEdit: false, data: {} })
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);

  useEffect(() => {
    const isEdit = todo.selectedId ? true : false;
    setOpen(isEdit);

    if (isEdit) {
      const data = todo.data.find(item => item._id === todo.selectedId)
      setValue('title', data.title);
      setValue('description', data.description);
      setEdit({ isEdit, data })
    } else {
      setValue('title', '');
      setValue('description', '');
      setEdit({ isEdit, data: {} })
    }

  }, [setValue, todo])

  const onSubmit = async (data) => {
    try {
      let res = {};
      if (edit.isEdit) {
        res = await todoService.edit(edit.data._id, data);
        if (res.success) dispatch(editTodo({ id: edit.data._id, data }))
      }
      else { //AddNew
        res = await todoService.add(data);
        if (res.success) dispatch(addTodo(res.data))
      }
      reset();
      setOpen(false);
      toast.success(res.message ? res.message : 'Something went wrong')
    } catch (error) {
      toast.error(error.message ? error.message : 'Something went wrong')
    }
  }

  const onClosePopup = () => {
    setOpen(false);
    dispatch(selectEditTodo(''))
  }

  const forms = {
    title: { label: "Title", name: "title", placeholder: "Title", error: 'Todo title is required', },
    description: { label: "description", name: "description", placeholder: "Description", error: 'Todo description is required' },
  }

  return (
    <>
      <div className='fixed bottom-24 right-20 z-20'>
        <Button onClick={() => setOpen(true)} isPrimary={true}>Add Todo</Button>
      </div>
      <DialogBox inputs={{ open, onClosePopup, header: edit.isEdit ? 'Edit Todo' : 'Add Todo' }}>
        <form onSubmit={handleSubmit(onSubmit)} className='text-left' >
          <div className='p-4 mb-2'>
            <div className="flex flex-col mt-2">
              <Input {...forms.title} form={register('title', { required: true, value: edit.isEdit ? edit.data.title : '' })} />
              {errors.title && <p className='text-red-600 pl-3'>{forms.title.error}</p>}
            </div>
            <div className="flex flex-col mt-2">
              <Input {...forms.description} form={register('description', { required: true, value: edit.isEdit ? edit.data.description : '' })} />
              {errors.description && <p className='text-red-600 pl-3'>{forms.description.error}</p>}
            </div>
          </div>
          <div className="bg-gray-50 py-3 text-end">
            <Button isPrimary={false} onClick={() => onClosePopup()}> Cancel </Button>
            <Button type="submit" isPrimary={true}> {edit.isEdit ? "Update" : "Add"} Todo</Button>
          </div>
        </form>
      </DialogBox>
    </>
  )
}

export default AddEditTodo
