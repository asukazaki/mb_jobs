const getKintaiInfo = response => {
    const kintais = [];
    const jobList = response.body.jobList
    for (let i = 0; i < jobList.length; i ++){
        const item = jobList[i]
        kintais.push({
            id:item.id,
            date:item.date,
            dayOfWeek:item.dayOfWeek,
            dayOfWeekDisplayName : item.dayOfWeekDisplayName,
            startTime:item.startTime,
            endTime:item.endTime,
            restStartTime:item.restStartTime,
            restEndTime:item.restEndTime,
            workPerDay:item.workPerDay,
            restPerDay:item.restPerDay,
            overTimePerDay:item.overTimePerDay,
            jobStateCode : item.jobStateCode,
            holiday: item.holiday,
            holydayName: item.holydayName,
            dakokuError: item.dakokuError,
            firstErrorMessage: (item.errorMessages) ? item.errorMessages[0]:undefined,
            futureDate: item.futureDate,

            // validation
            startTimeValidate : true,
            startTimeMessages : [],
            endTimeValidate : true,
            endTimeMessages : [],
            // TODO: 検討
            initialstartTime:item.startTime,
            initialendTime : item.endTime
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
    error: false,
    updateMessages: undefined,
    canUpdateJobs: true
};

export default (state = initialState, action) => {
    switch (action.type){
        // リクエスト開始時にセット
        case 'START_REQUEST':
            return {
                id : action.payload.id,
                kintais : undefined,
                monthOverTime : undefined,
                error: false,
                canUpdateJobs : true,
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

            const kintai = action.payload.kintais[action.payload.index];
            if(kintai["initial"+action.payload.name] || action.payload.value){
                if(!action.payload.value.match("^([01]?[0-9]|2[0-3]):([0-5][0-9])$")){
                    isValid = false;
                    message = "時刻を正しく入力してください（hh:MM）";
                    if(action.payload.type === 'blur'){
                        onBlurCheck = false;
                    }
                }
            }
            return {
                ...state,
                kintais : setKintaisValidation(action,isValid,message,onBlurCheck),
                canUpdateJobs : isValid
            }
        case 'RECEIVE_UPDATE_DATA':
            const updatedJobsCount = action.payload.response.body.length;
            const updateMessages = updatedJobsCount !== undefined && updatedJobsCount > 0 ? `${updatedJobsCount} 件更新しました` : "";
            return {
                ...state,
                kintais: action.payload.kintais,
                // updateMessages : `${updatedJobsCount} 件更新しました`
                updateMessages : updateMessages
            }

        default :
        return state;
    }
}