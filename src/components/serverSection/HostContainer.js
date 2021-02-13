import React from 'react'
import HostItem from './HostItem'
import HostAdd from './HostAdd'
import '../../styles/container/hostContainer.scss'

function HostContainer({data = []}) {
    return (
        <div className="hostgrid">
            {data.map(item => { return <HostItem key={item.name + item.path} data={item} /> })}
            <HostAdd />
        </div>
    )
}

export default HostContainer
