import { LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LOGIN_URL, TOKEN_KEY, USER_INFO } from '../../constant/constant'
import { AppContext } from '../../context/context'

import {  apiPost } from '../../services/services'
// p pl pr pt pb >> m mr ml mt mb
const Order = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { getUser } = useContext(AppContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const nav = useNavigate()

  

    const Login = async (_body) => {
        try {
            setLoading(true)
            // console.log(_body)
            const { data } = await apiPost(LOGIN_URL, _body)
              console.log(data)
        
            setTimeout(()=>{
                if (data.token) {
                    localStorage.setItem(TOKEN_KEY, data.token)
                    if (data.role == 'admin') {
                        nav('/admin')
                    } else {
                        nav('/todo')
                    }
                }

                if(localStorage.getItem(TOKEN_KEY)){
                    getUser()
                }

                setLoading(false)
                
               
            },1000)
            
           

        } catch (err) {
            //   console.log(err.response.data)
            if (err.response.data.err_msg) {
                setError(err.response.data.err_msg)
            }
        }
    }

    const onSub = (data) => {
        console.log(data)
        Login(data)
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            start your 14-day free trial
                        </a>
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">


                        <div >
                            <label className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register('email', { required: { value: true, message: 'email is required' }, pattern: { value: emailReg, message: 'Invalid email' } })}
                                type="email"

                                className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && <p className='text-red-600'>{errors.email.message} </p>}
                        </div>
                        <div >
                            <label className="sr-only">
                                password
                            </label>
                            <input
                                {...register('password', { required: true, minLength: 3, maxLength: 20 })}
                                type="password"

                                className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="password.."
                            />
                            {errors.password && <p className='text-red-600'>password is required </p>}

                        </div>

                    </div>
                    {error  && <p className='text-red-600'>{error}</p>}
                    <div className="flex items-center justify-between">
                        {loading && !error ?
                            <div className="flex items-center">
                                <img style={{ position: 'absolute', zIndex: '-1' }} width={'80px'} src='https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47nogttyy9l1kfcz2ckyo2oot6pkp8dhvia62f9euw&rid=giphy.gif&ct=g' />
                            </div>
                            :
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                        }




                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Login

                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Order