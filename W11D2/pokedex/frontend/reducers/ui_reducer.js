
const uiReducer = (state = {}, action) => {

    Object.freeze(state)

    let newState = Object.assign({}, state)
    switch (action.type) {
        default: 
            return state
        
    }
}
export default uiReducer