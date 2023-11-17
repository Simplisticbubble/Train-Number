import React, {useState} from "react";
import './Station.css';
const stations = ["Leppington", "Edmondson Park", "Glenfield", "Casula", "Liverpool", "Warwick Farm", "Cabramatta", "Canley Vale", "Fairfield", "Yennora", "Guildford", "Merrylands", "Granville", "Clyde", "Auburn", "Lidcombe", "Flemington", "Homebush", "Strathfield", "Burwood", "Redfern", "Central", "Town Hall", "Wynyard", "Circular Quay", "St James", "Museum", "Kings Cross", "Edgecliff", "Bondi Junction"];


const Station = () => {
    const [Index, setIndex] = useState(0);
    const handleIndex = () => {
        setIndex((prevIndex)=> prevIndex + 1)
    }
    return (
    <div className="app__Station">
        <div className="app__Station-container">
            <h1 className="app__Station-name">{stations[Index]}</h1>
        </div>
    </div>
);};

export default Station;