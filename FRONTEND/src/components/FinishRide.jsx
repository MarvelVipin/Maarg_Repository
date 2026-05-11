import React from 'react'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

  const navigate = useNavigate()

  async function endRide() {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride?rideId=${props.ride._id}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${localStorage.getItem('captainToken')}`
          }
        }
      )

      const data = await response.json()

      console.log(data)

      if (response.status === 200) {

        navigate("/captain-home")

      }

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div>

      <div>

        <h5
          className='p-1 text-center w-[93%] absolute top-0'
          onClick={() => {
            props.setFinishRidePanel(false)
          }}
        >
          <i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i>
        </h5>

        <h3 className='text-2xl font-semibold mb-5 mt-4'>
          Finish this ride
        </h3>

        <div className='flex items-center justify-between p-3 border-2 border-blue-400 rounded-lg'>

          <div className='flex items-center gap-3 '>

            <img
              className=' h-14 object-cover w-14 rounded-full'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCnkA8Z1as6TlNW-IQY0bOxPicwmej0Il0g&s"
              alt=""
            />

            <h2 className='text-lg font-medium'>
              {props.rideData?.user?.fullname?.firstname}
            </h2>

            <h5 className='text-sm font-sem'>
              2.2 KM
            </h5>

          </div>

        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>

          <div className='w-full mt-5'>

            <div className='flex items-center gap-5 p-3 border-b-2'>

              <i className=" text-lg text-green-800 font-bold ri-map-pin-line gap-5"></i>

              <div>

                <h4 className='text-lg font medium'>
                  Pickup
                </h4>

                <p className='text-gray-600 text-sm -mt-1'>
                  {props.ride?.pickup}
                </p>

              </div>

            </div>

            <div className='flex items-center gap-5 p-3 border-b-2'>

              <i className="text-lg text-red-600 font-bold ri-map-pin-2-line gap-5"></i>

              <div>

                <h4 className='text-lg font medium'>
                  Destination
                </h4>

                <p className='text-gray-600 text-sm -mt-1'>
                  {props.ride?.destination}
                </p>

              </div>

            </div>

            <div className='flex items-center gap-5 p-3'>

              <i className=" text-lg font-bold text-gray-600 ri-bank-card-line gap-5"></i>

              <div>

                <h4 className='text-lg font medium'>
                  ₹{props.ride?.fare}
                </h4>

                <p className='text-gray-600 text-sm -mt-1'>
                  Cash
                </p>

              </div>

            </div>

          </div>

          <div className='mt-6 w-full'>

            <button
              className='w-full flex justify-center mt-5 bg-yellow-500 text-white font-semibold p-2 rounded-lg'
              onClick={endRide}
            >
              Complete Ride
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default FinishRide