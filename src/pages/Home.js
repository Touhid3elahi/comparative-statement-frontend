import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css'; 

function Home() {
  return (
    <div>
      <Header />
      <div className="content text-center p-5">
        <h1 className="mb-4">Welcome to the Comparative Statement Management System</h1>
        <p>
          This system allows you to manage and compare quotations from multiple suppliers for various materials.
        </p>
        {/* Add more content or links to other pages here */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
