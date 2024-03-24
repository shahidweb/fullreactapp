import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addTodo, editTodo } from '../../../store/todoSlice';
import { DialogBox, Input } from '../../UI';
import Button from '../../UI/Button';
import todoService from '../../services/todoService';


function AddEditTodo(props) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({ isEdit: false, data: {} })

  useEffect(() => {
    const isEdit = props?.edit?._id ? true : false
    const data = props?.edit
    setEdit({ isEdit, data });

    if (isEdit) {
      setValue('title', data.title);
      setValue('description', data.description);
    }
    setOpen(isEdit);

  }, [props, setValue])

  const onSubmit = async (data) => {
    if (!edit.isEdit) {
      try {
        const res = await todoService.add(data);
        if (res.success) {
          dispatch(addTodo(res.data))
          setOpen(false);
          reset();
          toast.success(res.message)
        }
        else console.log(res);
      } catch (error) {
        toast.error(error.message)
      }
    } else {
      try {
        const res = await todoService.edit(edit.data._id, data);
        if (res.success) {
          dispatch(editTodo({ id: edit.data._id, data }))
          toast.success(res.message);
          props.closeHandler()
        } else console.log(res)
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const onCancel = () => {
    setOpen(false)
    setValue('title', '');
    setValue('description', '');
    setEdit({ isEdit: false, data: {} })
    props.closeHandler()
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

      <DialogBox inputs={{ open, setOpen, header: "Add Todo" }}>

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
            <Button isPrimary={false} onClick={onCancel}> Cancel </Button>
            <Button type="submit" isPrimary={true}> {edit.isEdit ? "Update" : "Add"} Todo</Button>
          </div>
        </form>

      </DialogBox>
    </>
  )
}

export default AddEditTodo
