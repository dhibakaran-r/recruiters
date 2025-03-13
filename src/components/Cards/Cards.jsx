import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MdLogout, MdOutlineVerified } from "react-icons/md";
import Search from '../Search/Search';
import { filterData } from '../../service/filterData';
import { useSelector } from 'react-redux';
import { statusColor } from '../../service/statusColor';
import { IoMdCloseCircleOutline } from 'react-icons/io';

function Cards() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cardData, setCardData] = useState([]);
    const searchInput = useSelector((state) => state.searchInput.search);

    useMemo(() => {
        if (id === "Hired") {
            const candidatesData = JSON.parse(localStorage.getItem("hiredCandidates")) || [];
            setCardData(candidatesData);
        } else {
            const candidatesData = JSON.parse(localStorage.getItem("rejectedCandidates")) || [];
            setCardData(candidatesData);
        }
    }, [id])

    function handleLogout() {
        localStorage.removeItem('auth');
        navigate('/');
    }

    let filteredData = filterData(cardData, searchInput)
    const statusIcon = {
        "Hired": <MdOutlineVerified />,
        "Rejected": <IoMdCloseCircleOutline />,
    }
    return (
        <div className="panel_container">
            <div className="panel_head bgBlue">
                <div className="header">
                    <h2><span>{id} Candidates</span><span>{statusIcon[id]}</span></h2>
                    <span className="logout" onClick={() => handleLogout()}><MdLogout /></span>
                </div>
                <Search />
            </div>

            <div className='card_container'>
                {
                    filteredData.map((datas, index) => {
                        return (
                            <div key={index} className='card_body'>

                                <h1 className=''>{datas.name}</h1>

                                <div className='card_head'>
                                    <p><strong>Email:</strong> <span>{datas.email}</span></p>
                                    <p><strong>Phone no:</strong> <span>{datas.phone}</span></p>
                                </div>

                                <div className='card_head'>
                                    <p><strong>Education:</strong> <span>{datas.education}</span></p>
                                    <p><strong>Status:</strong><span className={`flex items-center justify-center gap-4 ${statusColor[datas.status]} p-2 bg-gray-200 rounded-md`}>{datas.status}{statusIcon[datas.status]}</span></p>
                                </div>
                                <p><strong>Skills:</strong> <span>{datas.skills.join(", ")}</span></p>
                                <p><strong>Experience:</strong> <span>{datas.experience}</span></p>

                                <p><strong>Selected Interviewers:</strong> <span>{datas.interviewers.map((c) => c + ", ") || "None"}</span></p>

                                <div className="card_block">
                                    <h3>Interviewer Feedback</h3>
                                    <p><strong>Strengths:</strong> <span>{datas.feedback?.strengths}</span></p>
                                    <p><strong>Weaknesses:</strong> <span>{datas.feedback?.weaknesses}</span></p>
                                    <div className="mb-4">
                                        <label className="block font-semibold mb-2">Rating:</label>
                                        <div className="p-4 flex bg-stone-300 rounded-sm">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`cursor-pointer text-3xl ${star <= datas.feedback.rating ? "!text-yellow-600" : "!text-gray-600"}`}

                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Cards