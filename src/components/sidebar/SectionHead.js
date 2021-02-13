import React from 'react'
import {useDispatch} from 'react-redux'
import '../../styles/sidebar/sectionHead.scss'


function SectionHead({text}) {
    const dispatch = useDispatch()
    return (
        <div className="sectionHead">
            <p className="title">{text}</p>
            <div className="subActions" onClick={() => {dispatch({"type" : "TOGGLE_ADD_SERVER", "data" : true})}}>
                <i className="ri-add-line"></i>
            </div>
        </div>
    )
}

export default SectionHead
