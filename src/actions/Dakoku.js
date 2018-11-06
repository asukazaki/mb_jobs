import fetchJsonp from 'fetch-jsonp';
import request from 'superagent';
import qs from 'qs';

const API_URL = 'http://localhost:8099/demo/jobs/'

// リクエスト開始
const startDakoku = (id,year,month,time,dakokuType) => ({
    type: 'START_DAKOKU',
    payload: {id, year, month,time,dakokuType},
});

// レスポンス受信
const receiveDakokuResponse = (id,year,month,time,dakokuType,error,response) => ({
    type: 'RECEIVE_DAKOKU',
    payload :{id,year,month,time,dakokuType,error,response}
});

// リクエスト完了
const finishRequest = (id,year,month) => ({
    type: 'FINISH_REQUEST',
    payload :{id,year,month},
});

// const getHhMmSs= ([hh,mm,ss]) => ({
const getHhMmSs= (date) => ({
    type: 'GET_HHMMSS',
    payload :{date},
});

// 打刻(POST)
export const postDakoku = (id, dakokuType) => {
    return  dispatch => {
        // 現在時刻、日付取得
        const [year,month,day,time] = getNowDate();
        // dispatch(startDakoku(id,year,month,time,dakokuType));

        try{
            console.log(makeBodyJson(dakokuType,time))
            request
                .post(API_URL + id + '/' + year + '/' + month + '/' + day)
                .set({'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '<a href="http://localhost:3000" target="_blank" rel="noreferrer" style="cursor:help;display:inline !important;">http://localhost:3000</a>'
                })
                    // .send({
                    //     startTime : time,
                    //     dakokuType : dakokuType
                    // })
                .send(makeBodyJson(dakokuType,time))
                .end((err,res) => {
                    // TODO: エラーハンドリング 今はそのまま下のdispatchいく
                    if(err != null)  dispatch(receiveDakokuResponse(id,year,month,time,dakokuType,true,null))
                    dispatch(receiveDakokuResponse(id,year,month,time,dakokuType,null,res));
                })

        } catch (err){
            dispatch(receiveDakokuResponse(id,year,month,true,null));
        }
        dispatch(finishRequest(id,year,month));
    };
};

const getNowDate = () =>{
    const dt = new Date();
    const year = dt.getFullYear();
    const month = ("00" + String((dt.getMonth()+1))).slice(-2);
    const day = ("00" + String(dt.getDate())).slice(-2);
    const time = ("00" + String(dt.getHours())).slice(-2) + ':' + ("00" + String(dt.getMinutes())).slice(-2) + ':' +("00" + String(dt.getSeconds())).slice(-2);
    console.log("===" + time);
    return [year,month,day,time];
};

const makeBodyJson = ((dakokuType,time) => {
    switch(dakokuType){
        case 'SYUKKIN':
        console.log("SYUKKIN")
        return(
            {
                startTime : time,
                dakokuType : dakokuType
            }
        );

        case 'TAIKIN':
        console.log("TAIKIN");
        return(
            {
                // startTime : time,
                endTime : time,
                dakokuType : dakokuType
            }
        );
        case 'REST_START':
        return(
            {
                restStartTime : time,
                dakokuType : dakokuType
            }
        );
        case 'REST_END':
        return(
            {
                restEndTime : time,
                dakokuType : dakokuType
            }
        );
        default:
        // error??
        console.log("DEFAULT")
        return(
            {
               
                dakokuType : "NONE"
            }
        );
    }
});

export const startClock = () => dispatch =>{
    setInterval(() => dispatch(getHhMmSs(new Date())), 1000) ;
};
