import fetchJsonp from "fetch-jsonp";
import request from "superagent";

const API_URL = "http://localhost:8099/demo/jobs/";

// レスポンス受信
const receiveDakokuResponse = (id,dakokuType,time,error,response) => ({
    type: 'RECEIVE_DAKOKU',
    payload:{id,dakokuType,time,error,response}
});

const postDakoku = (id,dakokuType) => {
    return dispatch => {
        const[year, month, day, time] = getNowDate();

        try {
            request
            .post(API_URL + id + "/" + year + "/" + month + "/" + day)
            .set({
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin":
                '<a href="http://localhost:3000" target="_blank" rel="noreferrer" style="cursor:help;display:inline !important;">http://localhost:3000</a>'
            })
            // .send({
            //     startTime : time,
            //     dakokuType : dakokuType
            // })
            .send(makeBodyJson(dakokuType,time))
            .end((err,res) => {
                if(err != null){
                    // error
                    // dispatch()
                } else {
                    dispatch(receiveDakokuResponse(id,dakokuType,time,err,res));
                }
            })

        } catch (err) {
            // TODO:
        }
    }
}

const getNowDate = () => {
    const dt = new Date();
    const year = dt.getFullYear();
    const month = ("00" + String(dt.getMonth()+1)).slice(-2);
    const day = ("00" + String(dt.getDate())).slice(-2);
    const time = ("00" + String(dt.getHours())).slice(-2) + 
        ":" +
        ("00" + String(dt.getMinutes())).slice(-2) +
        ":" +
        ("00" + String(dt.getDate())).slice(-2);

    return [year,month,day,time];
};

const makeBodyJson = (dakokuType, time) => {
    switch (dakokuType) {
      case "SYUKKIN":
        console.log("SYUKKIN");
        return {
          startTime: time,
          dakokuType: dakokuType
        };
  
      case "TAIKIN":
        console.log("TAIKIN");
        return {
          // startTime : time,
          endTime: time,
          dakokuType: dakokuType
        };
      case "REST_START":
        return {
          restStartTime: time,
          dakokuType: dakokuType
        };
      case "REST_END":
        return {
          restEndTime: time,
          dakokuType: dakokuType
        };
      default:
        // error??
        console.log("DEFAULT");
        return {
          dakokuType: "NONE"
        };
    }
  };