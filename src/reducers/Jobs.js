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
            overTimePerDay:item.overTimePerDay,
            jobStateCode : item.jobStateCode,
            startTimeValidate : true,
            startTimeMessages : [],
            // TODO: 検討
            initialStartTime:item.startTime
        })
    }
    return kintais;
};

const getMonthOverTime = response => {
    return response.body.monthOverTime;
}

const setKintaisValidation = (action,isValid,message,onBlurCheck) => {
    const kintai = action.payload.kintais[action.payload.index];
    const properyName = action.payload.name;
    kintai[properyName] = action.payload.value;
    kintai[properyName+'Validate'] = isValid;
    kintai[properyName+'Messages'] = message ? message : [];

    return action.payload.kintais.slice();
}

// 初期状態
const initialState = {
    id : undefined,
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
                kintais : undefined,
                monthOverTime : undefined,
                error: false
            };

        case 'RECEIVE_DATA':
            return action.payload.error
              ? { ...state, error:true}
              : {
                  ...state,
                  kintais: getKintaiInfo(action.payload.response),
                //   monthOverTime : action.payload.response.monthOverTime
                monthOverTime : getMonthOverTime(action.payload.response)
              };

        case 'VALIDATE':
            var isValid = true;
            var onBlurCheck = true;
            var message = "";

            switch (action.payload.name){
                case 'startTime' :
                    if(action.payload.jobStateCode == 0){
                        if(action.payload.value){
                            if(!action.payload.value.match("^[0-9]{2}:[0-9]{2}:[0-9]{2}$")){
                                isValid = false;
                                message = "hh:MM:ss で入力してください"
                                if(action.payload.type === 'blur'){
                                    onBlurCheck = false;
                                }
                            }
                        }else{
                            isValid = false;
                            message = "必須です"
                            onBlurCheck = false;
                        }
                    } else {
                        if(!action.payload.value.match("^[0-9]{2}:[0-9]{2}:[0-9]{2}$")){
                            isValid = false;
                            message = "hh:MM:ss で入力してください"
                            if(action.payload.type === 'blur'){
                                onBlurCheck = false;
                            }
                        }
                    }
                case 'endTime' :
                    break;
                case 'restStartTime' :
                    break;
                case 'restEndTime' :
                    break;
                default :
            }
            return {
                ...state,
                kintais : setKintaisValidation(action,isValid,message,onBlurCheck),
            }

        default :
        return state;
    }
}