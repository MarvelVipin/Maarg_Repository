import React from 'react'

const WaitingForDriver = () => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{props.setVehiclePanel(false)}}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Looking for a driver...</h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85OWJmYWM5Mi00ODAzLTQxNGMtODRmYi1kMWZmNjU0NWM5YzAucG5n" alt="" />
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg text-green-800 font-bold ri-map-pin-line gap-5  "></i>
            <div>
              <h4 className='text-lg font medium'>Brij Enclave Colony</h4>
              <p className='text-gray-600 text-sm -mt-1'>Sunderpur, Varanasi, Uttar Pradesh</p>
            </div>
          </div>
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
              <p className='text-gray-600 text-sm -mt-1'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
