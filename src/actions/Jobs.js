import fetchJsonp from 'fetch-jsonp';
import request from 'superagent';
import qs from 'qs';

const API_URL = 'http://localhost:8099/demo/jobs/'

// リクエスト開始
const startRequest = (id,year,month) => ({
    type: 'START_REQUEST',
    payload: {id, year, month},
});

// レスポンス受信
const receiveData = (id,year,month,error,response) => ({
    type: 'RECEIVE_DATA',
    payload :{id,year,month,error,response,}
});

// リクエスト完了
const finishRequest = (id,year,month) => ({
    type: 'FINISH_REQUEST',
    payload :{id,year,month},
});

// const nextMonth = (id,year,month) => ({
//     type: 'NEXT_MONTH',
//     payload:{id,year,month}
// });

// 一覧取得
export const fetchJobs = (id, year, month) => {
    // return async dispatch => {
    return  dispatch => {
        dispatch(startRequest(id,year,month));

        const settings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '<a href="http://localhost:3000" target="_blank" rel="noreferrer" style="cursor:help;display:inline !important;">http://localhost:3000</a>'
            },
            // body: JSON.stringify(data)
        }
        try{
            console.log(API_URL + id + '/' + year + '/' + month);
            request
            //   .get(`${receiveData}${id}/${year}/${month}`)
              .get(API_URL + id + '/' + year + '/' + month)
              .set({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '<a href="http://localhost:3000" target="_blank" rel="noreferrer" style="cursor:help;display:inline !important;">http://localhost:3000</a>'})
              .end((err,res) => {
                  if(err != null) {
                       dispatch(receiveData(id,year,month,true,null))
                  } else {
                    dispatch(receiveData(id,year,month,null,res));
                  }
                  
              })
                  
            // const responce = await fetchJsonp(API_URL + id + '/' + year + '/' + month, settings);
            // const data = await responce.json();
            // dispatch(receiveData(id,year,month,null,responce));
        } catch (err){
            dispatch(receiveData(id,year,month,true,null));
        }
        dispatch(finishRequest(id,year,month));
    };
};