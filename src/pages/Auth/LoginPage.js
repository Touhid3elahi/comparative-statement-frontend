import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import APIRequest from '../../services/api'; 
import { useNavigate } from "react-router-dom";
import { saveToken } from '../../services/TokenHandler';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading state to true
      setError(''); // Reset error message

      const response = await APIRequest.post('/api/login', {
        email,
        password,
      });

      saveToken(response.data.token);

      console.log('Login successful:', response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.'); // Set error message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };
  
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
