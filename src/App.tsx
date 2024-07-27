import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import DonorFormRegistration from './pages/DonorFormRegistration';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      {<Header />}
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/form-registration" element={<DonorFormRegistration />} />
      </Routes>
      <div style={{ marginBlock: 'auto'}}>
       { <Footer />}
      </div>
    </Router>
  );
};

export default App;
