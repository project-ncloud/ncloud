import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {LOGOUT} from '../../actions/auth'
import '../../styles/sidebar/bottomContainer.scss'

function SidebarBottom() {
    const dispatch = useDispatch()
    const history = useHistory()
    const toggleConsole = () => {
        dispatch({"type": "TOGGLE_CONSOLE"})
    }

    const logout = async () => {
        dispatch(await LOGOUT())
        history.push('/')
    }
    return (
        <div className="bottomContainer">
            <i className="ri-settings-fill settings icon" onClick={() => {dispatch({"type" : "TOGGLE_MODAL", "data" : true})}}></i>
            <i className="ri-information-fill info icon"></i>
            <i className="ri-code-box-fill settings icon" onClick={()=>toggleConsole()}></i>
            <i className="ri-logout-circle-line settings icon" onClick={()=>logout()}></i>
        </div>
    )
}

export default SidebarBottom
