"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export default function Home() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-gradient-primary d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
   
   {/* <div className="bg-gradient-primary d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}> */}
      <div className="card bg-gradient-custom rounded-5 shadow-lg text-center p-4">
        <h1 className="text-white mb-4 fw-bold">Password Generator</h1>

        <div className="mb-3">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="form-control text-center bg-light border-0 shadow-sm mb-2"
            placeholder="Generated Password"
          />
          <button className="btn btn-primary w-100 shadow-sm hover-scale" onClick={copyPasswordToClipboard}>
            Copy to Clipboard
          </button>
        </div>

        <div className="mb-3">
          <label className="text-white me-3">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="slider-custom"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="d-flex flex-column gap-2 align-items-start">
          <div className="form-check">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="form-check-input"
            />
            <label htmlFor="numberInput" className="form-check-label text-white">
              Include Numbers
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="form-check-input"
            />
            <label htmlFor="charInput" className="form-check-label text-white">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
      
    </div>
  );
}
