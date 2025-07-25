import React, { useContext } from 'react'
import assets from '../assets/assets'
import { useState } from 'react'
import { AuthContext } from '../../context/authContext'
const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", { fullName, email, password, bio })
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <img src="/favicon.svg" alt="" className='w-[100px] md:w-[min(30vw,250px)]' />
        <h1 className='text-white text-4xl md:text-7xl px-5'>QuickMess</h1>
      </div>

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' >
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img src={assets.arrow_icon} onClick={() => setIsDataSubmitted(false)} className='w-5 cursor-pointer' />}

        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} className='p-2 border border-gray-500 rounded-md focus:outline-none ' placeholder="Full name" required />
        )
        }
        {!isDataSubmitted && (
          <>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' placeholder="Email Address" required />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' placeholder="Password" required />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea rows={4} onChange={(e) => setBio(e.target.value)} value={bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' placeholder='provide a short bio...' required></textarea>
        )

        }
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        {currState === "Sign up" && <div className='flex items-center  gap-2 text-sm text-gray-500'>
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>}

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-600'>Create an account <span onClick={() => { setCurrState("Sign up") }} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage
