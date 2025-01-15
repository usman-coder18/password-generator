"use client"
import React, { useState, useCallback, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';  // Make sure to add custom CSS in a separate file

export default function Home() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="bg-gradient-primary w-100 " style={{ minHeight: '100vh' }}>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="card bg-gradient-custom rounded-5 shadow-lg p-5 text-center w-50">
          <h1 className="text-white mb-4 fw-bold">Password Generator</h1>
          <div className="mb-3">
            <input
              type="text"
              value={password}
              readOnly
              className="w-75 p-3 rounded-3 mb-2 text-center text-primary bg-light border-0 shadow-sm"
              ref={passwordRef}
              placeholder="Generated Password"
            />
            <button
              onClick={copyPasswordToClipboard}
              className="btn btn-primary w-25 p-3 rounded-3 mx-2 shadow-sm hover-scale"
            >
              Copy
            </button>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <label className="text-white me-2">Length:</label>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer slider-custom"
                onChange={(e) => setLength(e.target.value)}
              />
              <span className="text-white ms-2">{length}</span>
            </div>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="me-2"
              />
              <label className="text-white" htmlFor="numberInput">Numbers</label>
            </div>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                id="charInput"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="me-2"
              />
              <label className="text-white" htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
