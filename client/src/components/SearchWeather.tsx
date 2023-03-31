import { useState } from "react";
import WeatherItem from "./WeatherItem";
import { useEffect } from "react";
import AsyncSelect from "react-select/async"
import React from "react";

function SearchWeather() {

    const [locationsData, setLocationsData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('undefined');

    useEffect(() => {
        getLocations();
    }, [])

    function getLocations() {
        fetch('http://localhost:4000/locations')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setLocationsData(data)
            });
    }

    const loadLocations = (searchValue: string, callback: (arg0: never[]) => void) => {
        setTimeout(() => {
            // console.log("Location Data: ",locationsData)
            const filteredLocations = locationsData.filter((option:string | any) => {
                // console.log("option: ",(option['city_ascii']));
                // return option.city_ascii.toLowerCase().includes(searchValue.toLowerCase())
                // return {...option, city_ascii: option.city_ascii.toLowerCase().includes(searchValue.toLowerCase()) }
                if (option.city_ascii.toLowerCase().includes(searchValue.toLowerCase())){

                
                return {
                    label: option.city_ascii + ', ' + option.admin_name + ', ' + option.iso3, 
                    value: option.city_ascii
                }
            }
            }
            );
            console.log('loadLocations', searchValue, filteredLocations);
            callback(filteredLocations)
        }, 500)
    }

    const handleChange = (selectedOption:{ label: string, value: string }):void => {
        if (selectedOption.value === "undefined") {
            return undefined
        } else {
            setSelectedValue(selectedOption.value);
            console.log("handleChange", selectedOption);
        }
    };

    return (
        <div className='overlay'>
            <div className='container'>
                <div className="section section_inputs">
                    <AsyncSelect
                        // cacheOptions
                        // defaultOptions
                        placeholder={'Search for city...'}
                        value={selectedValue}
                        // getOptionLabel={e  => e.city_ascii + ', ' + e.admin_name + ', ' + e.iso3}
                        // getOptionValue={e =>e.id}
                        loadOptions={loadLocations}
                        // onInputChange={handleInputChange}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <WeatherItem handleLocation={selectedValue} />
        </div>

    )
};

export default SearchWeather;