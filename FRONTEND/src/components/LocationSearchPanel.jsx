import React from 'react'

const LocationSearchPanel = (props) => {
    console.log(props)

    const locations = [
        "Brij's Enclave, Sunderpur, Varanasi, Uttar Pradesh",
        "99Major Hooks Road, Varanasi, Uttar Pradesh",
        "No Way Crossing, Naria, Varanasi, Uttar Pradesh",
        "B85 Srinivas Bakes, Naria, Varanasi, Uttar Pradesh",
        "BR and more ice-cream, Naria, Varanasi, Uttar Pradesh",
    ]
  return (
    <div>
        {
            locations.map(function (elem, idx){
                return <div key={idx} onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 border-2 p-3 border-gray-10 active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='h-8 w-12 flex items-center justify-center'><i className="ri-map-pin-2-fill "></i></h2>
            <h4 className='font-medium'>{elem}</h4>
        </div>
            })
        }

    </div>
  )
}

export default LocationSearchPanel
