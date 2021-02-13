import React from 'react'
import {useState} from 'react'
import '../../styles/modal/modalBase.scss'

function Modal({name, showMe, func, specClass, width = '600px', has_list = false, children}) {
    const [searchstr, setSearchStr] = useState('')
    return (
        <div className={`overlayContainer ${showMe ? null : 'hide'}`}>
            <div className="overlayWrapper" onClick={func}></div>
            <div className="ocontainer oAddServerContainer" style={{width:width}}>
                <div className="topBar">
                    <i className="ri-close-fill" onClick={func}></i>
                </div>
                <div className="actionBar">
                    <div className="confirmHead purple">{name}</div>
                    {has_list ? <input type="search" name="" onChange={(e) => setSearchStr(e.target.value)} value={searchstr} placeholder="Search user"></input> : null}
                </div>

                <div className={`modalContainer ${specClass ? specClass : null}`}>
                    {React.cloneElement(children, {func, searchstr})}
                </div>
                
            </div>
        </div>
    )
}

export default Modal
