import React from 'react'
import '../../styles/sidebar/topButton.scss'

function TopButton({name, func}) {
    return (
        <div className="mainLogo" onClick={func}>
            <i className="ri-hard-drive-fill icon"></i>
            <p>{name}</p>
        </div>
    )
}

export default TopButton
