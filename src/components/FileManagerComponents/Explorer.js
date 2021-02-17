import {React, useState, useEffect} from 'react'
import axios from 'axios'
import PathBar from './PathBar'
import ItemContainer from './ItemContainer'

function Explorer() {
    const [state, setState] = useState([])
    const [path, setPath] = useState('')

    useEffect(() =>{
        axios.post('/dir/', {"path": "D:\\"}).then(resolve=>{
            setState(resolve.data.data)
            setPath(resolve.data.path)
        }).catch(err=>{
            return []
        })
    }, [])

    useEffect(() =>{
        axios.post('/dir/', {"path": path}).then(resolve=>{
            setState(resolve.data.data)
        }).catch(err=>{
            console.error(err)
        })
    }, [path])

    const downDir = (name) => {
        setPath(path + '\\' + name)
    }

    const upDir = () => {
        setPath(path.substring(0, path.lastIndexOf('\\')))
    }

    return (
        <div className="fExplorer">
            <div className="fHeader fPadding">
                <h1>Explorer</h1>
            </div>
            {console.log(path)}
            <PathBar path={path}/>
            <ItemContainer itemData={state} upFunc={upDir} downFunc={downDir} />
        </div>
    )
}

export default Explorer
