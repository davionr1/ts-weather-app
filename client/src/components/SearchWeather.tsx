import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
/*
    NOTES:
    Where did this `SingleValue` import come from?
    I found the expected type for the onChange function in react-select
    by hovering over the onChange function in the AsyncSelect component.
    Then I tried importing it, first from 'react-select/async', but that
    did not work. Do I tried a non-default import from the root of the
    libray, which did work.
*/
import { SingleValue } from "react-select";

import WeatherItem from "./WeatherItem";
import LocationOption from "./LocationOption";


function SearchWeather() {
    const [locationsData, setLocationsData] = useState<LocationOption[]>([]);
    const [selectedValue, setSelectedValue] = useState<LocationOption>();

    useEffect(() => {
        getLocations();
    }, []);

    function getLocations() {
        fetch("http://localhost:4000/locations")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLocationsData(data);
            });
    }

    const loadLocations = (searchValue: string, callback: (arg0: LocationOption[]) => void) => {
        setTimeout(() => {
            // console.log("Location Data: ",locationsData)
            const filteredLocations = locationsData.filter((option: LocationOption) => {
                return option.city_ascii.toLowerCase().includes(searchValue.toLowerCase());
            });
            console.log("loadLocations", searchValue, filteredLocations);
            callback(filteredLocations);
        }, 500);
    };

    const handleChange = (selectedOption: SingleValue<LocationOption>): void => {
        if (selectedOption === null) {
            return undefined;
        } else {
            /*
                NOTES:
                The *correct* type for the selectedOption is a SingleValue<LocationOption>.
                This a generic wrapper around the LocationOption type. Therefore, the existing
                code was incorrectly using `.value`, which does not exist on the LocationOption type.
                Just select the whole object. It is later used to create the weather query.
            */
            setSelectedValue(selectedOption);
            // Incorrect Code:
            // setSelectedValue(selectedOption.value);
            // console.log("handleChange", selectedOption.value);
        }
    };

    return (
        <div className="overlay">
            <div className="container">
                <div className="section section_inputs">
                    {/* 
                        NOTES:
                        Here we must properties of LocationOption, but get them to conform
                        to the { value: string, label: string } type that AsyncSelect expects.
                        We do this by using the getOptionLabel and getOptionValue functions.
                        I have chosen to use the id as the value, but you could use any property.
                        For example, you could use the city_ascii as the value. This would allow
                        to you to query a weather API using the city_ascii as the query parameter.
                    */}
                    <AsyncSelect
                        // cacheOptions
                        // defaultOptions
                        placeholder={"Search for city..."}
                        value={selectedValue}
                        getOptionLabel={(e: LocationOption) =>
                            e.city_ascii + ", " + e.admin_name + ", " + e.iso3
                        }
                        getOptionValue={(e: LocationOption) => `${e.id}`}
                        loadOptions={loadLocations}
                        // onInputChange={handleInputChange}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <WeatherItem handleLocation={selectedValue} />
        </div>
    );
}



export default SearchWeather;
