import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scrolltotop from './components/ScrollToTop';
import Home from './pages/home/home';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Opportunities from './pages/opportunites/opportunites';
import Companies from './pages/companies/companies';
import Profile from './pages/profile/profile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Scrolltotop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/companies" element={<Companies />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
