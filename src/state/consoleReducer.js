const INIT = {
    "showConsole": false,
    "logs": [

    ]
}

const consoleReducer = (state = INIT, action) => {
    switch(action.type){
        case 'TOGGLE_CONSOLE':
            return {...state, "showConsole": !state.showConsole}
        case 'ADD_SUCC_LOG':
            return {...state, "logs" : [...state.logs, {"msg": action.data.msg, "success": true, "warning": false, "failed": false, "typeMsg": action.data.typeMsg}]}
        case 'ADD_WARN_LOG':
            return {...state, "logs" : [...state.logs, {"msg": action.data.msg, "success": false, "warning": true, "failed": false, "typeMsg": action.data.typeMsg}]}
        case 'ADD_FAIL_LOG':
            return {...state, "logs" : [...state.logs, {"msg": action.data.msg, "success": false, "warning": false, "failed": true, "typeMsg": action.data.typeMsg}]}
        case 'CLEAR_LOGS':
            return {...state, "logs" : []}
        default:
            return state
    }
}

export default consoleReducer