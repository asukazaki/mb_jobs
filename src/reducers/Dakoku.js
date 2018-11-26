const initialState = {
    id : undefined,
    dakokuType : undefined,
    time : undefined,
    error : undefined,
    messages : [],
    hh : undefined,
    mm : undefined,
    ss : undefined,
}

export default (state = initialState,action) => {
    switch(action.type){
        case 'RECEIVE_DAKOKU':
        return action.payload.error
        ? {...state, error:true}
        : {
            // ...state,
            ...state,
            id:action.payload.id,
            // dakokuType: action.payload.dakokuType,
            // time : action.payload.time,
            messages : state.messages.concat([action.payload.time + action.payload.dakokuType + ' 打刻しました'])
        };

        case 'GET_HHMMSS':
        const dt = action.payload.date;
        const hour = ("00" + String(dt.getHours())).slice(-2);
        const minutes = ("00" + String(dt.getMinutes())).slice(-2);
        const seconds = ("00" + String(dt.getSeconds())).slice(-2);
            return {
                // ここでstate展開しないと後に'RECEIVE_DATA'の時messagesが参照できなくなる
                ...state,
                hh : hour,
                mm : minutes,
                ss : seconds
            };
        default :
            return state;
    }
}