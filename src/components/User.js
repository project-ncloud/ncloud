import {React, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {IS_TOKEN_VALID} from '../actions/auth'

function User() {
    const loginInfo = useSelector(state => state.authReducer)
    const history = useHistory()
    
    useEffect(() => {
        async function checkingToken(){
            const token = localStorage.getItem('NCLOUD_TOKEN')
            if(token !== null){
                const obj = await IS_TOKEN_VALID(token)
                if(obj.status){
                    const {manager, admin} = obj.data
                    if(admin !== true && manager !== true){
                        history.push('/user')
                    }else{
                        history.push('/admin')
                    }
                }else{
                    history.push('/')
                }
            }
        }
        checkingToken()
    }, [history, loginInfo.username])

    return (
        <div>
            User Route
        </div>
    )
}

export default User
