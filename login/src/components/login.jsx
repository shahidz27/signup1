import React, { useState } from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    //firebase API
  };


  firebase.initializeApp(firebaseConfig);


function SignupForm() {
  const [title, setTitle] = useState("Sign up");
  const [maxHeight, setMaxHeight] = useState("60px");
  const [signupBtnClass, setSignupBtnClass] = useState("");
  const [signinBtnClass, setSigninBtnClass] = useState("disable");
  const [passwordError, setPasswordError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");


  const handleSigninClick = () => {
    setMaxHeight("0");
    setTitle("Sign in");
    setSignupBtnClass("disable");
    setSigninBtnClass("");
  };

  const handleSignupClick = () => {
    setMaxHeight("60px");
    setTitle("Sign up");
    setSignupBtnClass("");
    setSigninBtnClass("disable");
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    if (password.length > 0 && password.length < 6) {
        setPasswordError("Password should be at least 6 characters");
        return;
      }

    // TODO: send the data to your Firebase backend or perform any other desired actions

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update the user's display name
      userCredential.user.updateProfile({
        displayName: name
      })
        .then(() => {
          console.log("User profile updated successfully");
          event.target.reset(); // reset the form fields
          // Set the login status to display the alert box
          setLoginStatus("success");

          // TODO: Do something after user has signed up successfully
        })
        .catch((error) => {
          console.log(`Error updating user profile: ${error.message}`);
        });
    })
    .catch((error) => {
      console.log(`Error creating new user: ${error.message}`);
    });
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1 id="title">{title}</h1>
        {loginStatus === "success" &&
          <div className="alert alert-success" role="alert">
            You have successfully signed up!
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field" style={{ maxHeight: maxHeight, width: 348}}>
              <FontAwesomeIcon icon={faUser} style={{ marginLeft: 15}}/>
              <input type="text" name="name" placeholder="name" /><br />
            </div>
            <div className="input-field" style={{ width: 348}}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginLeft: 15}}/>
              <input type="email" name="email" placeholder="email" /><br />
            </div>
            <div className="input-field" style={{ width: 348}}>
              <FontAwesomeIcon icon={faLock} style={{ marginLeft: 15}}/>
              <input type="password" name="password" placeholder="password" /><br />
              {passwordError && <p style={{ color: "red", position:'absolute', top: 270 }}>{passwordError}</p>}
            </div>
            {/* <p style={{ marginTop: "5px" }}>lost password <a href="#">click here</a></p> */}
          </div>
          <div className="btn-field" >
            <button type="submit" id="signupBtn" onClick={handleSignupClick} className={signupBtnClass}>sign up</button>
            <button type="submit" id="signinBtn" onClick={handleSigninClick} className={signinBtnClass}>sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
