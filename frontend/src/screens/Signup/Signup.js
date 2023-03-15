import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import Cards from "../../components/cards";
import { Input, PasswordInput } from "../../components/Input";
import { registerUser } from "../../features/auth/authActions";

const Signup = () => {
  const { userInfo, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [pass, setPass] = useState({ value: "", error: "" });
  const [repass, setRePass] = useState({ value: "", error: "" });

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/");
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
  }, [navigate, userInfo, success]);

  const handleSubmit = () => {
    if (name.value === "") {
      setName({ value: "", error: "Please enter email" });
    } else if (email.value === "") {
      setEmail({ value: "", error: "Please enter email" });
    } else if (pass.value === "") {
      setPass({ value: "", error: "Please enter password" });
    } else if (repass.value === "") {
      setRePass({ value: "", error: "Please enter re-password" });
    } else if (pass.value !== repass.value) {
      setRePass({ value: "", error: "Password does not match" });
    } else {
      console.log({ email, pass });
      let data = {
        name: name.value,
        email: email.value,
        password: pass.value,
        password_confirm: repass.value,
        tc: true,
      };
      dispatch(registerUser(data));
    }
  };
  return (
    <div className="login-container">
      <Cards>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <Input
          label="Name"
          type="text"
          placeholder="Please enter name"
          value={name.value}
          error={name.error}
          onChange={(e) => {
            setName({ value: e.target.value, error: "" });
          }}
        />
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
        <PasswordInput
          label="Re-Password"
          placeholder="Please re-enter password"
          value={repass.value}
          error={repass.error}
          onChange={(e) => {
            setRePass({ value: e.target.value, error: "" });
          }}
        />
        <PrimaryButton
          style={{ width: "100%" }}
          onClick={handleSubmit}
          label="Sign Up"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Cards>
    </div>
  );
};

export default Signup;
