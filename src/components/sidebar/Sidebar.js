import React from 'react'
import {useDispatch} from 'react-redux'
import TopButton from './TopButton'
import SectionHead from './SectionHead'
import SidebarList from './SidebarList'
import SidebarBottom from './SidebarBottom'
import '../../styles/sidebar.scss'

const data = [{"server_name" : "BOT er Server", "is_running" : false}]

function Sidebar() {
    const dispatch = useDispatch()

    const gotoDashboard = () => {
        dispatch({"type": "TOGGLE_UI", "data":"showDashboard"})
    }
    return (
        <div className="sidebar">
            <TopButton name="N Cloud" func={() => gotoDashboard()} />
            <div className="bigSpacer"></div>
            <SectionHead text="Servers" />
            <div className="spacer"></div>
            <SidebarList data={data} />
            <SidebarBottom />
        </div>
    )
}

export default Sidebar
