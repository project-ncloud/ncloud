import React from 'react'
import {useSelector} from 'react-redux'
import Dashboard from './Dashboard'
import ServerSection from './serverSection/ServerSection'
import '../styles/container/container.scss'


function Container() {
    const uiData = useSelector(state => state.uiReducer)

    return (
        <div className="container">
            <Dashboard toggle={uiData[0].value} />
            <ServerSection toggle={uiData[1].value} />
        </div>
    )
}

export default Container
