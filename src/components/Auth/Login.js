import React,{ useState } from "react";

import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';

import firebase from '../../firebase/index';
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {

  const { handleChange, handleSubmit, values, handleBlur, errors, isSubmitting } = useFormValidation(
    INITIAL_STATE,
    validateLogin,
    authenticate
  );
  const [login, setLogin ] = useState(true);
  const [firebaseError, setFirebaseError ] = useState(null);
   
  async function authenticate() {
    const { name, email, password } = values;

    try {
      login ? 
      await firebase.login(email, password)
      :
      await firebase.register(name, email, password);
      props.history.push("/");

    } catch(err) {
      console.error("Authentication Error",err)
      setFirebaseError(err.message)
    }

  }

  return (
      <div>
        {login ? 
          <h2 className="mv3">Login</h2> 
          : 
          <h2 className="mv3">Create Account</h2>
        }
        <form className="flex flex-column" onSubmit={handleSubmit}>
          {!login && 
            <input 
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="off"
            />
          }
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={errors.email && 'error-input'}
            name="email"
            type="email"
            placeholder="Your email"
            autoComplete="off"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          {!login ? 
            <input 
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={errors.password && 'error-input'}
              name="password"
              type="password"
              placeholder="Choose a secure password"
              autoComplete="off"
            />
            :
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={errors.password && 'error-input'}
              name="password"
              type="password"
              placeholder="input password"
              autoComplete="off"
            />
          }
          {errors.password && <p className="error-text">{errors.password}</p>}
          {firebaseError && <p className="error-text">{firebaseError}</p>}
          <div className="flex mt3">
            <button 
              type="submit"
              className="button pointer mr2"
              disabled={isSubmitting}
              style={{ background: isSubmitting ? "grey" : "orange" }}
            >
              Submit
            </button>
            <button 
              type="button"
              className="button pointer"
              onClick={() => setLogin(prevLogin => !prevLogin)}
            >
              {!login ? "Already have an account?" : "Need to create an account?" }
            </button>
          </div>
        </form>
        <div className="forgot-password">
          <Link to="/forgot">Forgot password??</Link>
        </div>
      </div>
    );
}

export default Login;
