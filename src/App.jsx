import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ApplicationForm from './components/ApplicationForm/ApplicationForm'
import Home from './components/Home/Home'
// import HRDashboard from './components/HRDashboard/HRDashboard'
// import HRLogin from './components/HRLogin/HRLogin'
// import ApplicationDetails from './components/ApplicationDetails/ApplicationDetails'
// import InterviewerDashboard from './components/InterviewerDashboard/InterviewerDashboard'
// import InterviewFeedback from './components/InterviewFeedback/InterviewFeedback'
// import HRFinalDecision from './components/HRFinalDecision/HRFinalDecision'
import Login from './pages/Login/Login'
import PrivateRoute from './pages/PrivateRoute'
import RecruiterPages from './pages/RecruiterPages'

function App() {
  
  return (
    <div className='App'>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/application' element={<ApplicationForm />} />
          <Route path='/*' element={
            <PrivateRoute>
              <RecruiterPages />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
