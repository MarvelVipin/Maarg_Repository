import { useState, useEffect } from "react";
import { getLocationSuggestions } from "../services/locationService";

const LocationSearchPanel = ({
    suggestions,
    activeField,
    setPickup,
    setDestination,
    setSuggestions,
    setPanelOpen   
}) => {
    return (
        <div className="bg-white">
            {suggestions.map((place, index) => (
                <div
                    key={index}
                    className="p-3 border-b cursor-pointer hover:bg-gray-200"
                    onClick={() => {   
                        if (activeField === "pickup") {
                            setPickup(place.display_name);
                        } else {
                            setDestination(place.display_name);
                        }

                        setSuggestions([]);
                        setPanelOpen(false);   
                    }}
                >
                    {place.display_name}
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;