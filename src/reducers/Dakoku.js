// 初期状態
const initialState = {
    id : undefined,
    year : undefined,
    month : undefined,
    time :undefined,
    dakokuType: undefined,
    error: false,
    response : undefined,
    messages : [],
    hh : undefined,
    mm : undefined,
    sss : undefined,
};

export default (state = initialState, action) => {
    switch (action.type){
        // リクエスト開始時にセット
        case 'START_DAKOKU':
            return {
                id : action.payload.id,
                year : action.payload.year,
                month : action.payload.month,
                time :action.payload.time,
                dakokuType: action.payload.dakokuType,
                error: false
            };

        case 'RECEIVE_DAKOKU':
            return action.payload.error
              ? { ...state, error:true}
              : {
                  ...state,
                  id : action.payload.id,
                  year : action.payload.year,
                  month : action.payload.month,
                  time :action.payload.time,
                  messages:state.messages.concat([action.payload.time + '打刻しました'])
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
        default:
              return state;
    }
}