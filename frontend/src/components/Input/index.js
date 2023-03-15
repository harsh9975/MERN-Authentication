import React, { useState } from "react";
import "./input.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const Input = ({
  label,
  placeholder,
  onChange,
  style,
  showLabel = true,
  type = "text",
  value,
  error,
}) => {
  return (
    <div className="input-container">
      {showLabel && <label>{label}</label>}
      <input
        type={type}
        className="input"
        placeholder={placeholder}
        onChange={onChange}
        style={style}
        value={value}
      ></input>
        {error && <p className="p-error">{error}</p>}
    </div>
  );
};

export const PasswordInput = ({
  label,
  placeholder,
  onChange,
  style,
  showLabel = true,
  error,
  value,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{margin:'10px 0'}}>
<div className="input-container" style={{margin:0}}>
      {showLabel && <label>{label}</label>}
      <input
        className="input"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
        style={{ style }}
        value={value}
      />
      <div className="pass-icon" onClick={() => setShow(!show)}>
        {show ? <AiFillEye /> : <AiFillEyeInvisible />}
      </div>
    </div>
    {error && <p className="p-error">{error}</p>}
    </div>
    
  );
};
