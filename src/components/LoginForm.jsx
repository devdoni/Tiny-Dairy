import React, {useState} from 'react'
import Input from "./ui/Input";
import "../styles/componets/login-form.css";
import Button from "./ui/Button";
import {Link, useNavigate} from "react-router-dom";
import {getUserNickname, loginUser} from "../utils/userStorage";
import {useAuth} from "../context/AuthContext";
import log from "loglevel";

const LoginForm = () => {

    const { login }= useAuth();
    const navigate = useNavigate();

    // 유저의 로그인 정보를 담는 State
    const [userValues, setUserValues] = useState({
        id: "",
        password: "",
    });

    // ID 또는 PW 입력 오류를 담는 State
    const [errors, SetErrors] = useState({});

    // Input 터치 상태를 담는 State
    const [touched, setTouched] = useState({});

    // 입력 데이터 Validate
    const validate = (v) => {
        log.debug("[LoginForm] validate()");

        const e = {};
        if (!v.id) e.id = "아이디를 입력해주세요.";
        if (!v.password) e.password = "비밀번호을 입력해주세요.";

        return e;
    }

    // 입력 데이터 Change 핸들러
    const loginInputChangeHandler = (e) => {
        log.debug("[LoginForm] loginInputChageHandler()");

        const { name, value } = e.target;
        setUserValues({ ...userValues, [name]: value });
    };

    // 입력 데이터 Blur 핸들러
    const loginInputBlurHandler = (e) => {
        log.debug("[LoginForm] loginInputBlurHandler()");

        const { name } = e.target;
        setTouched((s) => ({ ...s, [name]: e.target.value }));
        SetErrors(validate({ ...userValues, [name]: e.target.value }));
    }

    // 입력 데이터 Submit 핸들러
    const loginDateSubmitHandler = async (e) => {
        log.debug("[LoginForm] onSubmit()");

        e.preventDefault();
        const nextErrors = validate(userValues);
        SetErrors(nextErrors);
        setTouched({id: true, password: true });

        if (Object.keys(nextErrors).length) return;
        // 로컬스토리지를 이용한 로그인 기능
        try {
            let result = await loginUser(userValues.id, userValues.password);
            if (result) {
                alert('로그인이 완료되었습니다.');
                let userNickname = getUserNickname(userValues.id);

                login(userValues.id, userNickname);
                navigate("/");
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            log.warn('로그인 시도중 오류가 발생: ', error);

            alert('죄송합니다 로그인 시도중 오류가 발생했습니다.');
            navigate("/");
        }

    };

    return (
        <>
            <div className="login-container">
                <div className='login-content'>
                    <h4>로그인</h4>
                    <form name="login" className="login-form" onSubmit={loginDateSubmitHandler}>
                        <Input
                          label="아이디"
                          name="id"
                          placeholder="아이디를 입력해주세요."
                          className={`login-input ${touched.id && errors.id ? "invalid" : ""}`}
                          value={userValues.id}
                          onChange={loginInputChangeHandler}
                          onBlur={loginInputBlurHandler}
                          error={touched.id ? errors.id : ""}
                          required
                        />
                        <Input
                          label="비밀번호"
                          type="password"
                          name="password"
                          placeholder="비밀번호를 입력해주세요."
                          className={`login-input ${touched.password && errors.password ? "invalid" : ""}`}
                          value={userValues.password}
                          onChange={loginInputChangeHandler}
                          onBlur={loginInputBlurHandler}
                          error={touched.password ? errors.password : ""}
                          required
                        />
                        <Button
                          pill={true}
                          type={'button'}
                          children="로그인"
                          size="lg"
                          variant="primary"
                          className="login-button"
                          onClick={loginDateSubmitHandler}
                        />
                        <Link to="/signup" className="signup-nav"><h5>회원가입</h5></Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginForm;