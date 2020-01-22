import axios from "axios";

const url = "https://game-show.herokuapp.com/match/";
// const url = "http://localhost:8000/match/";

const pressYourLuckURL = "https://game-show.herokuapp.com/press-your-luck/";
// const pressYourLuckURL = "http://localhost:8000/press-your-luck/";

class MatchService {
  static getMatch() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static stop() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(pressYourLuckURL + "stop");
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default MatchService;
