import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HRDashboard from '../components/HRDashboard/HRDashboard'
import ApplicationDetails from '../components/ApplicationDetails/ApplicationDetails'
import InterviewerDashboard from '../components/InterviewerDashboard/InterviewerDashboard'
import InterviewFeedback from '../components/InterviewFeedback/InterviewFeedback'
import HRFinalDecision from '../components/HRFinalDecision/HRFinalDecision'
import Cards from '../components/Cards/Cards'

function RecruiterPages() {
    return (
        <>
            <Routes>
                <Route path='/hrdashboard' element={<HRDashboard />} />
                <Route path='/applicationDetails/:id' element={<ApplicationDetails />} />
                <Route path='/interviewer' element={<InterviewerDashboard />} />
                <Route path='/feedback/:id' element={<InterviewFeedback />} />
                <Route path='/finaldecision/:id' element={<HRFinalDecision />} />
                <Route path='/cards/:id' element={<Cards />} />
            </Routes>
        </>
    )
}

export default RecruiterPages