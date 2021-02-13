import store from '../store'

function LOGINFO(msg, typeMsg = "Success"){
    store.dispatch({"type": "ADD_SUCC_LOG", "data": {msg, typeMsg}})
}

function LOGERR(msg, typeMsg = "Failed"){
    store.dispatch({"type": "ADD_FAIL_LOG", "data": {msg, typeMsg}})
}

function LOGWARN(msg, typeMsg = "Warning"){
    store.dispatch({"type": "ADD_WARN_LOG", "data": {msg, typeMsg}})
}

function LOGCLR(){
    store.dispatch({"type": "CLEAR_LOGS"})
}

export {LOGINFO, LOGERR, LOGWARN, LOGCLR}