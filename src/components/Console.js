import React from 'react'
import {useSelector} from 'react-redux'
import {LOGCLR} from '../actions/log'
import '../styles/console.scss'


function Console() {
    const consoleData = useSelector(state => state.consoleReducer)

    return (
        <div className={`nasconsole ${consoleData.showConsole ? null : 'Nright'}`} id="nConsolePanel">
            <div className="sectionTitle purple">Console</div>
            <button className="clrBtn subBg red" style={{width:'max-content'}} onClick={() => LOGCLR()}>Clear</button>
            <div className="debugContainer" id="debugContainer">
                {consoleData.logs.map(log => {
                    return (
                <div key={Math.random().toString(36).substring(7)}>{log.msg}
                    <span className={`${log.success ? 'cyanBg' : log.warning ? 'yellowBg' : 'redBg'}`}>
                        {log.typeMsg}
                    </span>
                </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Console
