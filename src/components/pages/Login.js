import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import fb_logo from '../../assets/img/fb_logo.png'
import g_logo from '../../assets/img/g_logo.png'
import git_logo from '../../assets/img/git_logo.png'
import log from '../../assets/img/log.png'
import { login } from '../../store/authSlice'
import { Button, Input } from '../UI/index'
import authService from '../services/authService'


function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forms = {
    username: { label: "Username", name: "username", placeholder: "Username", error: 'Username is required.' },
    password: { label: "Password", type: "password", name: "password", placeholder: "Password", error: 'Password length must enter min 5.' },
  }

  const onSubmit = async (data) => {
    try {
      const authDetails = await authService.login(data);
      dispatch(login(authDetails));
      if (authDetails?.data?.accessToken) {
        toast.success(authDetails?.message);
        navigate('/');
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="relative flex items-top justify-center min-h-[600px] bg-white sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 mr-8 sm:rounded-lg">
            <img src={log} alt="loginimage" />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <span>Welcome back !!!</span>
            <h2 className='text-4xl font-bold dark:text-white mb-5'>Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='text-left' >
              <div className="flex flex-col mt-2">
                <Input {...forms.username} form={register('username', { required: true })} />
                {errors.username && <p className='text-red-600 pl-3'>{forms.username.error}</p>}
              </div>
              <div className="flex flex-col mt-2">
                <Input {...forms.password} form={register('password', { required: true, minLength: 5 })} />
                {errors.password && <p className='text-red-600 pl-3'>{forms.password.error}</p>}
              </div>
              <div className='text-center mt-5'>
                <Button type={true} isPrimary={true} disabled={Object.keys(errors).length}>Login <i className="fa-thin fa-arrow-right"></i></Button>
              </div>

              <div className='p-4 mt-5 text-center'>
                <h6 className='text-zinc-400'>or continoue with</h6>
                <div className='p-3 flex justify-center cursor-pointer items-center'>
                  <img src={g_logo} alt="g_logo" width={100} />
                  <img src={git_logo} alt="git_logo" width={100} />
                  <img src={fb_logo} alt="fb_logo" width={100} />
                </div>
                <div>
                  <span className='text-zinc-400'>Don't have an account yet? </span>
                  <Link to="/signup"><span className='hover:text-orange-700'>Sign up for Free</span></Link>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
