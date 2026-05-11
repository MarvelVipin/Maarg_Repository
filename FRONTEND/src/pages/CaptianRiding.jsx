import React, { useRef, useState } from 'react'
import { Link, useLocation} from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptianRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation();
  const ride = location.state?.ride;

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [finishRidePanel])

  const submitHandler = (e)=>{
    e.preventDefault()
  }
  return (




    <div className='h-screen '>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => { }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i></h5>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://cdn-icons-png.flaticon.com/128/346/346945.png" alt="" />
        <Link to='/captain-home' className='h-10 w-10  bg-purple-700 flex items-center justify-center rounded-full '>
          <i className=" text-lg font-medium text-white ri-logout-circle-line"></i>
        </Link>
      </div>
      <div className='h-4/5 '>
        <img className='h-full w-full object-cover' src="https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2018/10/Spaines-es_Shield-Web_RiderEmergencyAssistance_20181015.gif" alt="" />
      </div>
      <div className='h-1/5 p-6 bg-yellow-300 items-center justify-between flex pt-10' onClick={()=>{
        setFinishRidePanel(true)
      }}>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className=' mt-5 bg-purple-600 text-white font-semibold p-2  px-8 rounded-lg'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className='w-full fixed z-10 translate-y-full bottom-0  bg-white px-3 py-10 pt-12'>
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptianRiding
