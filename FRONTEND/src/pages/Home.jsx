import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx'
import VehiclePanel from '../components/VehiclePanel.jsx'
import ConfirmRide from '../components/ConfirmRide.jsx'
import LookingForDriver from '../components/LookingForDriver.jsx'
import WaitingForDriver from '../components/WaitingForDriver.jsx'
import MapComponent from "../components/MapComponent";
import { useEffect } from "react";
import { getLocationSuggestions } from "../services/locationService.js"

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const panelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      let query = activeField === "pickup" ? pickup : destination;

      if (query && query.length > 2) {
        const results = await getLocationSuggestions(query);
        setSuggestions(results);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [pickup, destination, activeField]);

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
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>


      <div className="absolute top-0 left-0 w-full flex items-center px-4 py-4 z-30">
        <img
          className='w-12'
          src="https://cdn-icons-png.flaticon.com/128/346/346945.png"
          alt=""
        />
      </div>


      <div className="absolute top-0 left-0 w-full h-full z-0">
        <MapComponent center={[25.3176, 82.9739]}
          zoom={13}
          zoomControl={false}
          className="h-full w-full" />
      </div>


      <div className='flex flex-col justify-end h-screen absolute top-0 w-full z-10 pointer-events-none pt-20'>

        <div className='h-[40%] p-6 bg-white relative pointer-events-auto rounded-t-2xl flex flex-col'>

          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className='text-2xl font-semibold'>Find a Trip</h4>

          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <div className="relative mt-5 space-y-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-black transition">
                <i className="ri-map-pin-fill text-gray-600 text-lg mr-3"></i>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => {
                    setActiveField("pickup");
                    setPanelOpen(true);
                  }}
                  placeholder="Enter pickup location"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>


              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-black transition">
                <i className="ri-flag-2-fill text-gray-600 text-lg mr-3"></i>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => {
                    setActiveField("destination");
                    setPanelOpen(true);
                  }}
                  placeholder="Enter destination"
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
          </form>
          <button className='bg-purple-800  text-white w-full py-3 px-2 rounded-lg mt-3'>
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className='bg-white h-0 pointer-events-auto'>
          <LocationSearchPanel
            suggestions={suggestions}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            setSuggestions={setSuggestions}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>


      <div ref={vehiclePanelRef} className='w-full fixed z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 pointer-events-auto'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='w-full fixed z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 pointer-events-auto'>
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div ref={vehicleFoundRef} className='w-full fixed z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 pointer-events-auto'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='w-full fixed z-20 bottom-0 bg-white px-3 py-10 pt-12 pointer-events-auto'>
        <WaitingForDriver waitingForDriver={waitingForDriver} setWaitingForDriver={setWaitingForDriver}/>
      </div>

    </div>
  )
}

export default Home
