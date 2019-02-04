import request from "superagent";

const API_URL = "http://localhost:8099/demo/jobs/";

const receiveDakokuResponse = (time, dakokuType, error) => ({
  type: "RECEIVE_DAKOKU",
  payload: { time, dakokuType, error }
});

const getHhMmSs = date => ({
  type: "GET_HHMMSS",
  payload: { date }
});

export const postDakokuAPI = (id, dakokuType) => {
  return dispatch => {
    const [year, month, day, time] = getNowDate();
    try {
      request
      .post(API_URL + id + "/" + year + "/" + month + "/" + day)
      .set({
        "Accept": "application/json",
        "Content-Type": "application/json"
      })
      // .send({
      //     startTime : time,
      //     dakokuType : dakokuType
      // })
      .send(makeBodyJson(dakokuType,time))
      .end((err, response) => {
          if (err){
            dispatch(receiveDakokuResponse(time,dakokuType,err));
          } else {
              dispatch(receiveDakokuResponse(time,dakokuType,null));
          }
      })
    } catch (e) {
        dispatch(receiveDakokuResponse(time,dakokuType,e));
    }
  };
};

const getNowDate = () => {
  const dt = new Date();
  const year = dt.getFullYear();
  const month = ("00" + String(dt.getMonth() + 1)).slice(-2);
  // const month = `00${(dt.getMonth() + 1)}`.slice(-2);
  const day = ("00" + String(dt.getDate())).slice(-2);
  const time =
    ("00" + String(dt.getHours())).slice(-2) +
    ":" +
    ("00" + String(dt.getMinutes())).slice(-2) +
    ":" +
    ("00" + String(dt.getSeconds())).slice(-2);
  //   console.log("===" + time);
  return [year, month, day, time];
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

  export const startClock = () => dispatch => {
    setInterval(() => dispatch(getHhMmSs(new Date())), 1000);
  };