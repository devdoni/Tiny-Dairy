import {getDateTime, getStringDateTime} from "./utils";
import bcrypt from "bcryptjs";
import log from "loglevel";

export const USER_DB_IN_LOCAL_STORAGE = "UserDB";
export const USER_DAIRY_DB_IN_LOCAL_STORAGE = "UserDiaryDB";
const SESSION_STORAGE_KEY = 'LOGGED_IN_SESSION_ID';

// UserDB Getter
export const getUserDB = () => {
  log.debug("[userStorage] getUserDB()");
  return JSON.parse(localStorage.getItem(USER_DB_IN_LOCAL_STORAGE));
}

// UserDB setter
export const setUserDB = (userObj) => {
  log.debug("[userStorage] setUserDB()");
  localStorage.setItem(USER_DB_IN_LOCAL_STORAGE, JSON.stringify(userObj));
}


// UserDiaryDB Getter
export const getUserDairyDB = () => {
  log.debug("[userStorage] getUserDairyDB()");
  return JSON.parse(localStorage.getItem(USER_DAIRY_DB_IN_LOCAL_STORAGE));
}

// UserDiaryDB setter
export const setUserDiaryDB = (dairyObj) => {
  log.debug("[userStorage] setUserDiaryDB()");
  localStorage.setItem(USER_DAIRY_DB_IN_LOCAL_STORAGE, JSON.stringify(dairyObj));
}


// 로컬스토리지를 이용한 회원가입 로직
export async function signUpUser (id, password, nickname) {
  log.debug("[userStorage] signUpUser()");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let UserDB = getUserDB();
  if (UserDB === null) {
    let newUserObj = {
      [id]: {
        'id': id,
        'password': hashedPassword,
        'nickname': nickname,
        'regDate': getDateTime(),
      }
    }
    setUserDB(newUserObj);
  } else {
    let userObj = UserDB;
    userObj[id] = {
      'id': id,
      'nickname': nickname,
      'password': hashedPassword,
      'regDate': getDateTime(),
    }
    setUserDB(userObj);
  }

  // Dairy DB Setting
  let userDiaryDB = getUserDairyDB();
  if (userDiaryDB === null) {
    let newUserDiary = {
      [id]: {

      }
    }
    setUserDiaryDB(newUserDiary);
  } else {
    let userDiaries = getUserDairyDB();
    userDiaries[id] = {}

    setUserDiaryDB(userDiaries);

  }
}

// 로컬스토리지 활용 로그인 로직
export async function loginUser (id, password) {
  log.debug("[userStorage] loginUser()");

  const userObj = localStorage.getItem(USER_DB_IN_LOCAL_STORAGE);

  if (userObj === null) return false;

  const savedObj = JSON.parse(userObj);

  if (savedObj[id].id !== id) return false;

  return await bcrypt.compare(password, savedObj[id].password);
}

// 로컬스토리지 활용 일기 저장 로직
export function userDairySaved(dairyObj) {
  log.debug("[userStorage] userDairySaved()");

  let newDairyObj = getUserDairyDB();

  if (newDairyObj === null && dairyObj === null) return false;

  let key = getStringDateTime();
  newDairyObj[getLoginedSessionId()][key] = {
    "key": key,
    "title": dairyObj.title,
    "body": dairyObj.body,
    "mood": dairyObj.mood,
    "regDate": getDateTime(),
  }

  setUserDiaryDB(newDairyObj);

  return true;
}

// 나의 정보를 가져오는 함수
export const getMyInfo = (uId) => {
  log.debug("[userStorage] getMyInfo()");

  if (getUserDB() === null) {
    return undefined;
  }

  let userDB = (getUserDB());
  return userDB[uId];

}

// 나의 정보를 저장하는 함수
export const setMyInfo = (uId, myInfo) => {
  log.debug("[userStorage] setMyInfo()");

  let UserInfos = getUserDB()
  UserInfos[uId] = myInfo;

  setUserDB(UserInfos);
}

export const getCurrentUserDiary = (id) => {
  log.debug("[userStorage] getCurrentUserDiary()");

  const userDairyDB = getUserDairyDB();

  return userDairyDB[id];
}

export const getSelectedDiary = (key) => {
  log.debug("[userStorage] getSelectedDiary()");

  const id = getLoginedSessionId();

  const userDairyDB = getUserDairyDB();

  if (userDairyDB[id][key] !== undefined) {
    return userDairyDB[id][key];
  } else {
    return null;
  }

}

// 세션 스토리지에서 로그인 세션을 가져오는 함수
export const getLoginedSessionId = () => {
  log.debug("[userStorage] getLoginedSessionId()");
  const sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY) || '';

  return sessionId;
}

// 세션 스토리지에 세션을 저장하는 함수
export const setLoginedSessionId = (id = '') => {
  log.debug("[userStorage] setLoginedSessionId()");
  if (id) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  } else {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }
}