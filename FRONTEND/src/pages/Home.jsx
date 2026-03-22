import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: '24px', 
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

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform:'translateY(0)',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
       transform:'translateY(100%)',
      })
    }
  }, [vehiclePanel])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-4 top-1' src="https://cdn-icons-png.flaticon.com/128/346/346945.png" alt="" />
      <div onClick={()=>{setVehiclePanel(false)}} className='h-screen w-screen'>
        <img className='h-full w-full' src="https://ubernewsroomapi.10upcdn.com/wp-content/uploads/2018/10/Spaines-es_Shield-Web_RiderEmergencyAssistance_20181015.gif" alt="" />
      </div>
      <div className='bg-white flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form action="" onSubmit={(e) => { submitHandler(e) }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4' type="text" placeholder='Enter pickup location' />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg  w-full mt-4' type="text" placeholder='Enter destination' />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel  setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      <div ref={vehiclePanelRef} className='w-full fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <i className="ri-arrow-down-wide-line"></i>
        <h3 className='text-2xl font-semibold mb-5'>Choose Vehicle</h3>

        <div className='w-full mb-2 flex border-2 active:border-black rounded-xl items-center justify-between p-3 bg-gray-100'>
          <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85OWJmYWM5Mi00ODAzLTQxNGMtODRmYi1kMWZmNjU0NWM5YzAucG5n" alt="" />
          <div className=' w-1/2 ml-5'>
            <h4 className='font-medium text-base'>Maarg Car <span><i className="ri-user-fill"></i>5</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, Compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹193</h2>
        </div>
        <div className='w-full mb-2 flex border-2  rounded-xl active:border-black items-center justify-between p-3 bg-gray-100'>
          <img className='h-12' src="https://png.pngtree.com/png-vector/20220326/ourmid/pngtree-motorcycle-cartoon-vector-colorful-illustrations-png-image_4514944.png" alt="" />
          <div className=' w-1/2 ml-5'>
            <h4 className='font-medium text-base'>BikeRide <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, Compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹85</h2>
        </div>
        <div className='w-full mb-2 flex border-2 rounded-xl active:border-black  items-center justify-between p-3 bg-gray-100'>
          <img className='h-12' src="https://png.pngtree.com/png-clipart/20230414/original/pngtree-blue-rickshaw-png-image_9056195.png" alt="" />
          <div className=' w-1/2 ml-5'>
            <h4 className='font-medium text-base'>TriCar <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, Compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹85</h2>
        </div>
        <div className='w-full mb-2 flex border-2  rounded-xl active:border-black items-center justify-between p-3 bg-gray-100'>
          <img className='h-12' src="https://png.pngtree.com/png-vector/20220326/ourmid/pngtree-motorcycle-cartoon-vector-colorful-illustrations-png-image_4514944.png" alt="" />
          <div className=' w-1/2 ml-5'>
            <h4 className='font-medium text-base'>Maarg Car<span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, Compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>₹85</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
