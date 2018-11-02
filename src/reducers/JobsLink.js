// 初期状態
const initialState = {
    id : undefined,
    year : undefined,
    month : undefined
};

export default (state = initialState, action) => {
    // TODO: id をもらう（ログイン時アクション？）
    return{
        id : 1,
        year : new Date().getFullYear(),
        month : ("00"+String((new Date().getMonth()+1))).slice(-2)
    }
}