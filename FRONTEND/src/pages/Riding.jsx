import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen '>
        <Link to='/home' className='fixed h-10 w-10 right-5 top-5 bg-purple-700 flex items-center justify-center rounded-full '>
            <i className=" text-lg font-medium text-white ri-home-9-line"></i>
        </Link>
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2018/10/Spaines-es_Shield-Web_RiderEmergencyAssistance_20181015.gif" alt="" />
    </div>
    <div className='h-1/2 p-4'>
    <div className='flex items-center justify-between'>
        <img className='h-14' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85OWJmYWM5Mi00ODAzLTQxNGMtODRmYi1kMWZmNjU0NWM5YzAucG5n" alt="" />
        <div className='text-right '> 
          <h2 className='text-lg font-medium'>Vivek Pandey</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP009TJ</h4>
          <p className='text-sm font-sm text-gray-600'> Maruti Suzuki</p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg text-red-600 font-bold ri-map-pin-2-line gap-5  "></i>
            <div>
              <h4 className='text-lg font medium'>Brij Enclave Colony</h4>
              <p className='text-gray-600 text-sm -mt-1'>Sunderpur, Varanasi, Uttar Pradesh</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className=" text-lg font-bold text-gray-600 ri-bank-card-line gap-5  "></i>
            <div>
              <h4 className='text-lg font medium'>₹193.20</h4>
              <p className='text-gray-600 text-sm -mt-1'>Pay the Cash</p>
            </div>
          </div>
        </div>
      </div>
    <button className='w-full mt-5 bg-purple-600 text-white font-semibold p-2 rounded-lg'> Make Payment </button>
    </div>
    </div>
  )
}

export default Riding
