import React, {useState, useEffect} from 'react'

const Tile = ({id, value, toggleTile}) => {

    return (
        <div className={`tile text-4xl tracking-tight font-extrabold text-center text-gray-100 border-gray-800 border-2 ${value === null ? "bg-white" : ""} ${value === 1 ? 'bg-red-500': ""} ${value === 2 ? 'bg-blue-500' : ''} `} 
        onClick={() => toggleTile(id)}>
            {value == null ? "" : (value === 1 ? 'X': 'O')}
        </div>
    )
}

export default Tile
