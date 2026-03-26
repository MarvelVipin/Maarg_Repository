import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCaptain } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const CaptainSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const { captain, setCaptain } = useCaptain()
  const navigate = useNavigate()


  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    console.log(captainData)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10 color' src="https://cdn-icons-png.flaticon.com/128/346/346945.png" />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h3 className='text-lg font-medium mb-2'>What's your Name ?</h3>
            <div className='flex gap-4 mb-5'>
              <input
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                type="text"
                required
                placeholder='First Name'
                className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base' />

              <input
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                type="text"
                required
                placeholder='Last Name'
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email ?</h3>
            <input
              type="email"
              required
              placeholder='example@mail.com'
              className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <h3 className='text-xl mb-2 font-medium'>What's your password ?</h3>
            <input
              type="password"
              required
              placeholder='***********'
              className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-4 mb-5'>
              <input
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value)
                }}
                type="text"
                required
                placeholder='Vehicle Color'
                className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base' />

              <input
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value)
                }}
                type="text"
                required
                placeholder='Vehicle Plate'
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' />
            </div>
            <div className='flex gap-4 mb-5'>
              <input
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
                type="number"
                required
                placeholder='Vehicle Capacity'
                className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base' />

              <select
                required
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value)
                }}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="bike">Motor Bike</option>
                <option value="auto">Auto</option>
              </select>

            </div>


            <button className='bg-blue-600 text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
              Create Captain Account
            </button>
            <p className='text-center'>Already have an account !<Link to="/captain-login
          " className='text-blue-600'>Login here</Link></p>
          </form>
        </div>
        <div>
          <p className='text-[10px] mt-8 leading-tight'>By proceeding, you agree and consent to receive communications from Voyage,
            including calls,messages, and SMS, for account-related updates, service notifications.</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
