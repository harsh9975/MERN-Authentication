import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import Cards from "../../components/cards";
import { Input, PasswordInput } from "../../components/Input";
import { userLogin } from "../../features/auth/authActions";
import "./Login.css";

const Login = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [pass, setPass] = useState({ value: "", error: "" });
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = () => {
    if (email.value === "") {
      setEmail({ value: "", error: "Please enter email" });
    } else if (pass.value === "") {
      setPass({ value: "", error: "Please enter password" });
    } else {
      let data = {
        email: email.value,
        password: pass.value,
      };
      dispatch(userLogin(data));
    }
  };

  return (
    <div className="login-container">
      <Cards>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Input
          label="Email"
          type="email"
          placeholder="Please enter email"
          value={email.value}
          error={email.error}
          onChange={(e) => {
            setEmail({ value: e.target.value, error: "" });
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Please enter password"
          value={pass.value}
          error={pass.error}
          onChange={(e) => {
            setPass({ value: e.target.value, error: "" });
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
        <PrimaryButton
          onClick={handleSubmit}
          style={{ width: "100%" }}
          label="Login"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          Don't have an Account? <Link to="/register">Sign Up</Link>
        </div>
      </Cards>
    </div>
  );
};

export default Login;
