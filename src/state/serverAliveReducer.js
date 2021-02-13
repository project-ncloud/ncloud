const INIT = {
    "count": 0,
    "alive_count": 0
}


const serverAliveReducer = (state = INIT, action) => {
    switch(action.type){
        case 'ADD_ONLY_COUNT':
            return {...state, "count": state.count + 1}
        case 'ADD_ALIVE_COUNT':
            return {"count": state.count + 1, "alive_count" : state.alive_count + 1}
        case 'RESET_ALIVE_COUNT':
            return INIT
        default:
            return state
    }
}

export default serverAliveReducer