import React, {useState} from 'react'
import Input from "./ui/Input";
import "../styles/componets/signup-form.css";
import Button from "./ui/Button";
import {Link, useNavigate} from "react-router-dom";
import {signUpUser} from "../utils/userStorage";


const SignUpForm = () => {

    const [userValues, setUserValues] = useState({
        id: "",
        nickname: "",
        password: "",
        password_again: ""
    });

    const navigate = useNavigate();
    const [errors, SetErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = (v) => {
        const e = {};
        if (!v.id) e.id = "아이디를 입력해주세요.";
        else if (v.id.length < 4) e.id = "4글자 이상 입력해주세요.";

        if (!v.nickname) e.nickname = "닉네임을 입력해주세요."
        else if (v.nickname.length < 2) e.nickname = "2글자 이상 입력해주세요.";

        if (!v.password) e.password = "비밀번호을 입력해주세요.";
        else if (v.password.length < 8) e.password = "8자 이상 입력해주세요."

        if (!v.password_again) e.password_again = "비밀번호를 한번 더 입력해주세요.";
        else if (v.password !== v.password_again) e.password_again = "비밀번호가 일치하지 않습니다.";

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
        setTouched({id: true, nickname: true, password: true, password_again: true});

        if (Object.keys(nextErrors).length) return;


        // 로컬스토리지를 이용한 회원가입
        try {
            await signUpUser(userValues.id, userValues.password, userValues.nickname);

            alert("회원가입이 완료되었습니다 로그인 페이지로 이동합니다.");
            navigate("/login");

        } catch (error) {
            alert('죄송합니다 회원가입 시도중 오류가 발생했습니다.')
        }

    };

    return (
        <>
            <div className="signup-container">
                <div className='signup-content'>
                    <h4>회원가입</h4>
                    <form name="signup" className="signup-form" onSubmit={onSubmit}>
                        <Input
                          label="아이디"
                          name="id"
                          placeholder="아이디를 입력해주세요."
                          className={`signup-input ${touched.id && errors.id ? "invalid" : ""}`}
                          value={userValues.id}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={touched.id ? errors.id : ""}
                          required
                        />
                        <Input
                          label="닉네임"
                          name="nickname"
                          placeholder="닉네임을 입력해주세요."
                          className={`signup-input ${touched.nickname && errors.nickname ? "invalid" : ""}`}
                          value={userValues.nickname}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={touched.nickname ? errors.nickname : ""}
                          required
                        />
                        <Input
                          label="비밀번호"
                          type="password"
                          name="password"
                          placeholder="비밀번호를 입력해주세요."
                          className={`signup-input ${touched.password && errors.password ? "invalid" : ""}`}
                          value={userValues.password}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={touched.password ? errors.password : ""}
                          required
                        />
                        <Input
                          label="비밀번호 확인"
                          type="password"
                          name="password_again"
                          placeholder="비밀번호를 한번 더 입력해주세요."
                          className={`signup-input ${touched.password_again && errors.password_again ? "invalid" : ""}`}
                          value={userValues.password_again}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={touched.password_again ? errors.password_again : ""}
                          required
                        />
                        <Button
                          pill={true}
                          type={'button'}
                          children="회원가입"
                          size="lg"
                          variant="primary"
                          className="signup-button"
                          onClick={onSubmit}
                        />
                        <Link to="/login" className="login-nav"><h5>로그인</h5></Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignUpForm;