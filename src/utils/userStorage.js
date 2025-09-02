import {getDateTime, getStringDateTime} from "./utils";
import bcrypt from "bcryptjs";
import log from "loglevel";

export const USER_DB_IN_LOCAL_STORAGE = "UserDB";
export const USER_DAIRY_DB_IN_LOCAL_STORAGE = "UserDiaryDB";

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
  
  
  if (!id || !password) return false;
  log.debug("유저 오브젝트 체크");
  const userObj = localStorage.getItem(USER_DB_IN_LOCAL_STORAGE);

  if (!userObj) return false;

  let savedObj
  try {
    savedObj = JSON.parse(userObj);

  } catch (err) {
    log.warn(`[userStorage] loginUser() Object Error - ${err}`);
    return false;
  }

  let user = savedObj?.[id];
  if (!user) return false;

  try {
    return await bcrypt.compare(password, user.password);

  } catch (err) {
    log.warn(`[userStorage] loginUser() Hash Error - ${err}`);
    return false;
  }
}

// 로컬스토리지 활용 일기 저장 로직
export function userDairySaved(dairyObj, user) {
  log.debug("[userStorage] userDairySaved()");

  let newDairyObj = getUserDairyDB();

  if (newDairyObj === null && dairyObj === null) return false;

  let key = getStringDateTime();
  newDairyObj[user.id][key] = {
    "key": key,
    "title": dairyObj.title,
    "body": dairyObj.body,
    "mood": dairyObj.mood,
    "regDate": getDateTime(),
  }

  setUserDiaryDB(newDairyObj);

  return true;
}

// 로컬스토리지 활용 비밀번호 변경 로직
export const changePassword = async (id, currentPassword, newPassword, confirmNewPassword) => {
  log.debug("[userStorage] changePassword()");

  try {
    if (!id || !currentPassword || !newPassword || !confirmNewPassword) return "INVALID_VALUE";
    if (newPassword !== confirmNewPassword) return "MISMATCH";
    if (newPassword.length < 8) return "WEAK_PASSWORD";

    const raw = localStorage.getItem(USER_DB_IN_LOCAL_STORAGE);
    if (!raw) return "INVALID_OBJECT";

    const db = JSON.parse(raw);
    const user = db[id];
    if (!user?.password) return "INVALID_USER";

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) return "INVALID_PASSWORD";

    db[id].password = await bcrypt.hash(newPassword, 10);

    localStorage.setItem(USER_DB_IN_LOCAL_STORAGE, JSON.stringify(db));
    return "SUCCESS";

  } catch (e) {
    log.warn(`[userStorage] changePassword() Error - ${e}`);
    return "UNKNOWN_ERROR";
  }

}

// 나의 정보를 가져오는 함수
export const getMyInfo = (uId) => {
  log.debug("[userStorage] getMyInfo()");

  if (getUserDB() === null) {
    return null;
  }

  let userDB = (getUserDB());
  return userDB[uId];

}

// 나의 정보를 저장하는 함수
export const setMyInfo = (newMyInfo) => {
  log.debug("[userStorage] setMyInfo()");

  if (newMyInfo === null) return false;

  let UserInfos = getUserDB()
  UserInfos[newMyInfo.id] = newMyInfo;

  setUserDB(UserInfos);
  return true;
}


export const getUserNickname = (id) => {
  log.debug("[userStorage] getUserNickname()");

  let userDB = getUserDB();

  if (userDB === null) {
    return null;

  } else {
    return userDB[id].nickname;
  }


}

export const getCurrentUserDiary = (id) => {
  log.debug("[userStorage] getCurrentUserDiary()");

  const userDairyDB = getUserDairyDB();

  return userDairyDB[id];
}

export const getSelectedDiary = (key, user) => {
  log.debug("[userStorage] getSelectedDiary()");

  const userDairyDB = getUserDairyDB();

  if (userDairyDB[user.id][key] !== undefined) {
    return userDairyDB[user.id][key];

  } else {
    return null;
  }

}

