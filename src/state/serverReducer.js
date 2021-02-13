
const serverReducer = (state = {}, action) => {
    switch(action.type){
        case 'STORE_SERVER':
            return action.data
        default:
            return state
    }
}
 
export default serverReducer