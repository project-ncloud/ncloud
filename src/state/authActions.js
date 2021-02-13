const INITIAL_VALUE = {
    "username" : "",
    "name" : "",
    "is_manager" : null,
    "is_admin" : null
}


const authReducer = (state = INITIAL_VALUE, action) =>{
    switch(action.type){
        case 'LOGIN':
            return action.data
        default:
            return state
    }
}

export default authReducer