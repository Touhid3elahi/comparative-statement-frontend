import React, { useState } from 'react';
import APIRequest from '../../services/api'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async () => {
    try {
      if (password !== passwordConfirmation) {
        // Passwords do not match, handle the error
        console.error('Passwords do not match');
        // You can display an error message to the user
        return;
      }

      // Send a POST request to the registration endpoint
      const response = await APIRequest.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation, // Include password_confirmation field
      });

      // Handle success response (e.g., show a success message or redirect to login)
      console.log('Registration successful:', response.data);

      // You can add a success message or redirect the user to the login page here
    } catch (error) {
      // Handle error responses (e.g., display error messages)
      console.error('Registration error:', error);

      // You can display an error message to the user
    }
  };

  return (
    <>
    <Header />
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Register;
