import React, {useState} from 'react'
import Input from "./ui/Input";
import "../styles/componets/login-form.css";
import Button from "./ui/Button";
import {Link, useNavigate} from "react-router-dom";
import {loginUser, setLoginedSessionId} from "../utils/userStorage";

const LoginForm = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();
    const [userValues, setUserValues] = useState({
        id: "",
        password: "",
    });

    const [errors, SetErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = (v) => {
        const e = {};
        if (!v.id) e.id = "아이디를 입력해주세요.";
        if (!v.password) e.password = "비밀번호을 입력해주세요.";

        return e;
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserValues({ ...userValues, [name]: value });
    };

    const onBlur = (e) => {
        const { name } = e.target;
        setTouched((s) => ({ ...s, [name]: e.target.value }));
        SetErrors(validate({ ...userValues, [name]: e.target.value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const nextErrors = validate(userValues);
        SetErrors(nextErrors);
        setTouched({id: true, password: true });

        if (Object.keys(nextErrors).length) return;

        // 로컬스토리지를 이용한 로그인 기능
        try {
            let result = await loginUser(userValues.id, userValues.password)
            if (result) {
                alert('로그인이 완료되었습니다.');
                setLoginedSessionId(userValues.id);
                setIsLoggedIn(true);
                navigate("/");
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.log('로그인 시도중 오류가 발생했습니다.');
        }

    };

    return (
        <>
            <div className="login-container">
                <div className='login-content'>
                    <h4>로그인</h4>
                    <form name="login" className="login-form" onSubmit={onSubmit}>
                        <Input
                          label="아이디"
                          name="id"
                          placeholder="아이디를 입력해주세요."
                          className={`login-input ${touched.id && errors.id ? "invalid" : ""}`}
                          value={userValues.id}
                          onChange={onChange}
                          onBlur={onBlur}
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
                          onChange={onChange}
                          onBlur={onBlur}
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
                          onClick={onSubmit}
                        />
                        <Link to="/signup" className="signup-nav"><h5>회원가입</h5></Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginForm;