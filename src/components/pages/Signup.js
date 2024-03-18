import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import fb_logo from '../../assets/img/fb_logo.png'
import g_logo from '../../assets/img/g_logo.png'
import git_logo from '../../assets/img/git_logo.png'
import log from '../../assets/img/log.png'
import { Button, Input, Select } from '../UI/index'

function Signup() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const password = useRef();
    password.current = watch('password', "");

    const forms = {
        username: { label: "Username", name: "username", placeholder: "Username", error: 'Username is required.' },
        email: { label: "Email", type: "email", name: "email", placeholder: "Email", error: 'Email is required.' },
        password: { label: "Password", type: "password", name: "password", placeholder: "Password", error: 'Password length must enter min 5.' },
        cpassword: { label: "Confirm Password", type: "password", name: "cpassword", placeholder: "Confirm Password", error: 'The Password do not match' },
        select: { label: "Role", name: "role", options: ['ADMIN', 'USER'] },
    }

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }


    return (
        <div className="relative flex items-top justify-center min-h-[600px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 mr-8 sm:rounded-lg">
                        <img src={log} alt="loginimage" />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                        <span>Welcome !!!</span>
                        <h2 className='text-4xl font-bold dark:text-white mb-5'>Sign In</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className='text-left' autoComplete='off' >
                            <div className="flex flex-col mt-2">
                                <Input {...forms.username} form={register('username', { required: true })} />
                                {errors.username && <p className='text-red-600 pl-3'>{forms.username.error}</p>}
                            </div>
                            <div className="flex flex-col mt-2">
                                <Input {...forms.email} form={register('email', { required: true })} />
                                {errors.email && <p className='text-red-600 pl-3'>{forms.email.error}</p>}
                            </div>
                            <div className="flex flex-col mt-2">
                                <Input {...forms.password} form={register('password', { required: true, minLength: 5 })} />
                                {errors.password && <p className='text-red-600 pl-3'>{forms.password.error}</p>}
                            </div>
                            <div className="flex flex-col mt-2">
                                <Input {...forms.cpassword}
                                    form={register('cpassword', { validate: value => value === password.current || forms.cpassword.error })} />
                                {errors.cpassword && <p className='text-red-600 pl-3'>{errors.cpassword.message}</p>}
                            </div>
                            <div className="flex flex-col mt-2">
                                <Select {...forms.select} form={register('role')} />
                            </div>
                            <div className='text-center mt-5'>
                                <Button type={true} isPrimary={true} disabled={Object.keys(errors).length}>Sign Up <i className="fa-thin fa-arrow-right"></i></Button>
                            </div>
                            <div className='p-4 mt-5 text-center'>
                                <h6 className='text-zinc-400'>or continoue with</h6>
                                <div className='p-3 flex justify-center cursor-pointer items-center'>
                                    <img src={g_logo} alt="g_logo" width={100} />
                                    <img src={git_logo} alt="git_logo" width={100} />
                                    <img src={fb_logo} alt="fb_logo" width={100} />
                                </div>
                                <div>
                                    <span className='text-zinc-400'>if you have an account? </span>
                                    <Link to="/login"><span className='hover:text-orange-700'>Login</span></Link>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
