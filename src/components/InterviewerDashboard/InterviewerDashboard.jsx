import { useState, useEffect } from "react";
import { MdLogout, MdOutlinePending, MdOutlineVerified } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { statusColor } from "../../service/statusColor";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { filterData } from "../../service/filterData";
import { useSelector } from "react-redux";
import Search from "../Search/Search";

const InterviewerDashboard = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const searchInput = useSelector((state) => state.searchInput.search)

    useEffect(() => {
        const storedCandidates = JSON.parse(localStorage.getItem("applications")) || [];
        const assignedCandidates = storedCandidates.filter((candidate) => candidate.status === "Interview Scheduled");
        setCandidates(assignedCandidates);
    }, []);

    let filteredData = filterData(candidates, searchInput)

    function handleLogout() {
        localStorage.removeItem('auth');
        navigate('/');
    }

    const statusIcon = {
        "Pending": <MdOutlinePending />,
        "Hired": <MdOutlineVerified />,
        "Rejected": <IoMdCloseCircleOutline />,
        "Interview Scheduled": <SiTicktick />,
        "Interview Completed": <SiTicktick />
    }

    return (
        <div className="panel_container">
            <div className="panel_head bgPurple">
                <div className="header">
                    <h2><span>Interviewer Panel</span><span><RiTodoLine /></span></h2>
                    <span className="logout" onClick={() => handleLogout()}><MdLogout /></span>
                </div>
                <Search />
            </div>

            {filteredData.length === 0 ? (
                <p>No assigned candidates yet.</p>
            ) : (
                <div className="table_container">
                    <table className="table_wrap">
                        <thead className='table_head'>
                            <tr className='w-full'>
                                <th><span>Name</span></th>
                                <th><span>E-mail ID</span></th>
                                <th><span>Mobile NO</span></th>
                                <th><span>Skills</span></th>
                                <th><span>Education</span></th>
                                <th><span>Experience</span></th>
                                <th><span>Status</span></th>
                                {/* <th><span></span></th> */}
                            </tr>
                        </thead>
                        <tbody className='table_body'>
                            {
                                filteredData.map((datas, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><span>{datas.name}</span></td>
                                            <td><span>{datas.email}</span></td>
                                            <td><span>{datas.phone}</span></td>
                                            <td><span>{datas.skills.join(", ")}</span></td>
                                            <td><span>{datas.education}</span></td>
                                            <td><span>{datas.experience}</span></td>
                                            <td><span className={`status_cell ${statusColor[datas.status]}`}>{datas.status}{statusIcon[datas.status]}</span></td>
                                            <td>
                                                <Link to={`/feedback/${datas.email}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                                    Give Feedback
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InterviewerDashboard;
