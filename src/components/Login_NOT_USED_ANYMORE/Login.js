import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { Modal, Button } from "react-bootstrap";

async function loginUser(credentials) {
 return fetch('http://localhost/15WL/X-Bank/_Backend/X-Bank/login', {
 //return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setUserData }) {
  const [netbankId, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const fetchedData = await loginUser({
      "netbankId": netbankId,
      "password": password
  });
  const token = fetchedData["token"];
  //setUserData(JSON.stringify(token));
  setUserData(fetchedData);
  }

  return(
    <Modal show={true}>
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </Modal>
  )
}

Login.propTypes = {
  setUserData: PropTypes.func.isRequired
};