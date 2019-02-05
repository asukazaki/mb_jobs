import request from 'superagent';

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

// クライアントサイドバリデーション
const validate = (index,kintais,name,value,eventType,jobStateCode) => ({
    type : 'VALIDATE',
    payload :{index,kintais,name,value,eventType,jobStateCode},
})

// update完了
const receiveUpdatedData = (id,year,month,kintais,error,response) => ({
    type: 'RECEIVE_UPDATE_DATA',
    payload :{id,year,month,kintais,error,response,}
})

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
                  // TODO: エラーハンドリング
                  if(err != null)  dispatch(receiveData(id,year,month,true,null))
                  dispatch(receiveData(id,year,month,null,res));
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

export const execValidate = (index,kintais,name,value,eventType,jobStateCode) => {
    return dispatch => {
        return dispatch(validate(index,kintais,name,value,eventType,jobStateCode))
    }
}

export const updateJobs = (id,year,month,kintais) => {
    return dispatch => {
        dispatch(startRequest(id,year,month));

        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        try{
            console.log(API_URL + id + '/' + year + '/' + month);
            request
            //   .get(`${receiveData}${id}/${year}/${month}`)
              .post(API_URL + id + '/' + year + '/' + month)
              .set({
                "Accept": "application/json",
                "Content-Type": "application/json"
              })
              .send(makeUpdateBodyJson(id,year,month,kintais))
              .end((err,res) => {
                  // TODO: エラーハンドリング
                  if(err != null)  dispatch(receiveUpdatedData(id,year,month,kintais,true,null))
                  dispatch(receiveUpdatedData(id,year,month,kintais,null,res));

              // 仮の遅刻判定メソッドがサーバーにあるので再度同期
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
                      .set(
                          {'Accept': 'application/json',
                           'Content-Type': 'application/json',
                          })
                      .end((err,res) => {
                          // TODO: エラーハンドリング
                          if(err != null)  dispatch(receiveData(id,year,month,true,null))
                          dispatch(receiveData(id,year,month,null,res));
                      })
                  } catch (err){
                    dispatch(receiveData(id,year,month,true,null));
                }
              })

        } catch (err){
            dispatch(receiveUpdatedData(id,year,month,kintais,true,null));
        }
        // dispatch(finishRequest(id,year,month));
    }
};

const makeUpdateBodyJson = (id, year, month, kintais) => {
    let jobs = [];
    kintais.map((item,index) => {
        if( item.startTime !== item.initialstartTime || item.endTime !== item.initialendTime){
            jobs.push({id: id, date: item.date, startTime: item.startTime, endTime: item.endTime})
        }
    })
    return JSON.stringify(jobs);
}