const getKintaiInfo = response => {
    const kintais = [];
    const jobList = response.body.jobList
    for (let i = 0; i < jobList.length; i ++){
        const item = jobList[i]
        kintais.push({
            id:item.id,
            date:item.date,
            dayOfWeek:item.dayOfWeek,
            startTime:item.startTime,
            endTime:item.endTime,
            restStartTime:item.restStartTime,
            restEndTime:item.restEndTime,
            workPerDay:item.workPerDay,
            restPerDay:item.restPerDay,
            overTimePerDay:item.overTimePerDay
        })
    }
    return kintais;
};

const getMonthOverTime = response => {
    return response.body.monthOverTime;
}

// 初期状態
const initialState = {
    id : undefined,
    year:undefined,
    month:undefined,
    kintais : undefined,
    monthOverTime : undefined,
    error: false
};

export default (state = initialState, action) => {
    switch (action.type){
        // リクエスト開始時にセット
        case 'START_REQUEST':
            return {
                id : action.payload.id,
                year : action.payload.year,
                month : action.payload.month,
                kintais : undefined,
                monthOverTime : undefined,
                error: false
            };

        case 'RECEIVE_DATA':
            return action.payload.error
              ? { ...state, error:true}
              : {
                  ...state,
                  month: action.payload.month,
                  kintais: getKintaiInfo(action.payload.response),
                //   monthOverTime : action.payload.response.monthOverTime
                monthOverTime : getMonthOverTime(action.payload.response)
              };

        default:
              return state;
    }
}