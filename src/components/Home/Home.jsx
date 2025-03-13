import React from 'react'
import { Link } from 'react-router-dom'
import { LiaUsersSolid } from "react-icons/lia";
import job from '../../assets/jobseeker.svg'
import hr from '../../assets/hr.svg'

function Home() {

    const homeData = [
        {
            head: "Apply for jobs",
            image: job,
            path: '/application',
            btnName: 'Apply here',
            btnColor: 'bg-green-400 hover:bg-green-700'
        },
        {
            head: "Recruiter Login here",
            image: hr,
            path: '/login',
            btnName: 'Recruiter Login',
            btnColor: 'bg-blue-400 hover:bg-blue-700'
        }
    ]

    return (
        <div className='home_container'>
            <div className='top_home_head'>
                <span><LiaUsersSolid /></span>
                <h1>Welcome to Recruiters</h1>
            </div>
            <div className='home_content'>
                {
                    homeData.map((data, i) => {
                        return (
                            <div className='home_card' key={i}>
                                <h2>{data.head}</h2>
                                <img src={data.image} className='' />
                                <Link to={data.path} className={`${data.btnColor}`}>
                                    {data.btnName}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home