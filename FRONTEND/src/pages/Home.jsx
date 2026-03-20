import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current, {
      height: '70%',
      padding: 24
      // opacity: 1,
    })
    gsap.to(panelCloseRef.current, {
      opacity: 1,
    })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        // opacity: 0,
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [panelOpen])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-4 top-1' src="https://cdn-icons-png.flaticon.com/128/346/346945.png" alt="" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full' src="https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2018/10/Spaines-es_Shield-Web_RiderEmergencyAssistance_20181015.gif" alt="" />
      </div>
      <div className='bg-white flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form action="" onSubmit={(e)=>{submitHandler(e)}}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e)=> {
              setPickup(e.target.value)
            }}
             className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4' type="text" placeholder='Enter pickup location' />
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={destination}
            onChange={(e)=> {
              setDestination(e.target.value)
            }}
             className='bg-[#eee] px-12 py-2 text-base rounded-lg  w-full mt-4' type="text" placeholder='Enter destination' />
          </form>
        </div>
        <div  ref={panelRef} className='h-[70%] bg-white h-0'>
          <LocationSearchPanel/>
        </div>
      </div>
      <div className='w-full fixed z-10 bottom-0 bg-white p-5'>
        <div className='w-full flex bg-red-100 item-center justify-between p-5'>
          <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85OWJmYWM5Mi00ODAzLTQxNGMtODRmYi1kMWZmNjU0NWM5YzAucG5n" alt="" />
          <div className='bg-green-100 w-1/2'>
            <h4 className='font-medium text-sm'>Maarg <span><i className="ri-user-fill"></i>5</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-500'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>Rs.193</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
