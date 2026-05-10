import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
       <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{props.setRidePopUpPanel(false) }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i></h5>

      <h3 className='text-2xl font-semibold mb-5 mt-4'>Ride for You</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg'> 
        <div className='flex items-center gap-3 '>
            <img className=' h-14 object-cover w-14 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCnkA8Z1as6TlNW-IQY0bOxPicwmej0Il0g&s" alt="" />
            <h2 className='text-lg font-medium'>{props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname}</h2>
            <h5 className='text-sm font-semibold'>2.2 KM</h5>
        </div>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg text-green-800 font-bold ri-map-pin-line gap-5  "></i>
            <div>
              <h4 className='text-lg font-medium'>Brij Enclave Colony</h4>
              <p className='text-gray-600 text-sm -mt-1'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg text-red-600 font-bold ri-map-pin-2-line gap-5  "></i>
            <div>
              <h4 className='text-lg font medium'>Brij Enclave Colony</h4>
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
        <div className='flex w-full  items-center justify-between'>
          <button onClick={()=>{
          props.setConfirmRidePopUpPanel(true)
          props.confirmRide?.()
        }} className=' mt-5 bg-green-600 text-white font-semibold p-2 px-8 rounded-lg'>Accept Ride</button>

        <button onClick={()=>{
          props.setRidePopUpPanel(false)
        }} className=' mt-5 bg-gray-500 text-white font-semibold p-2 px-8 rounded-lg'>Ignore Ride</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default RidePopUp
