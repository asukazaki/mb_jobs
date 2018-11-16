const initialState = {
    id : undefined,
    dakokuType : undefined,
    time : undefined,
    error : undefined,
    messages : []
}

export default (state = initialState,action) => {
    switch(action.type){
        case 'RECEIVE_DAKOKU':
        return action.payload.error
        ? {...state, error:true}
        : {
            ...state,
            id:action.payload.id,
            // dakokuType: action.payload.dakokuType,
            // time : action.payload.time,
            messages : state.messages.concat([action.payload.time + action.payload.dakokuType + ' 打刻しました'])
        }
        default :
            return state;
    }
}