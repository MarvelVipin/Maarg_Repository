import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

      if(response.status === 200){
        props.setConfirmRidePopUpPanel(false)
        props.setRidePopUpPanel(false)
        navigate("/captain-riding",{ state: { ride: response.data.ride } });
      }

  }
  return (
    <div>
       <div >
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{props.setRidePopUpPanel(false) }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i></h5>

      <h3 className='text-2xl font-semibold mb-5 mt-4'>Confirm this ride to start</h3>
      <div className='flex items-center justify-between p-3 bg-blue-400 rounded-lg'> 
        <div className='flex items-center gap-3 '>
            <img className=' h-14 object-cover w-14 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCnkA8Z1as6TlNW-IQY0bOxPicwmej0Il0g&s" alt="" />
            <h2 className='text-lg font-medium capitalize'>{props.ride?.user?.fullname?.firstname}</h2>
            <h5 className='text-sm font-sem'>2.2 KM</h5>
        </div>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg text-green-800 font-bold ri-map-pin-line gap-5  "></i>
            <div>
              <h4 className='text-lg font medium'>B88/11</h4>
              <p className='text-gray-600 text-sm -mt-1'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg text-red-600 font-bold ri-map-pin-2-line gap-5  "></i>
            <div>
              <h4 className='text-lg font medium'>Z88/11</h4>
              <p className='text-gray-600 text-sm -mt-1'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className=" text-lg font-bold text-gray-600 ri-bank-card-line gap-5  "></i>
            <div>
              <h4 className='text-lg font medium'>₹{props.ride?.fare}</h4>
              <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler} >
            <input value={otp} onChange={(e)=>{
              setOtp(e.target.value)
            }} type="text" placeholder='Enter OTP' className='bg-[#eee] px-6 py-4 font-mono text-base rounded-lg  w-full mt-4' />
            <button className='w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>

        <button onClick={()=>{
          props.setConfirmRidePopUpPanel(false)
          props.setRidePopUpPanel(false)
        }} className='w-full mt-2 bg-gray-700 text-black font-semibold p-2 rounded-lg text-white'>Cancel</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ConfirmRidePopUp
