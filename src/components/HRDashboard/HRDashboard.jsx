import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { MdLogout, MdOutlineAdminPanelSettings, MdOutlineVerified, MdOutlinePending } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { filterData } from "../../service/filterData";
import { Link, useNavigate } from "react-router-dom";
import './HRDashboard.css'
import { statusColor } from "../../service/statusColor";
import Search from "../Search/Search";
// import { setSelect } from "../../states/slices/selectSlice";

const HRDashboard = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const searchInput = useSelector((state) => state.searchInput.search)
    const [applicants, setApplicants] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("applications")) || [];
        setApplicants(data);
    }, []);

    function handleLogout() {
        localStorage.removeItem('auth');
        navigate('/');
    }
    const filteredApplicants = toggle
        ? applicants.filter((applicant) => applicant.status === "Interview Completed")
        : applicants;

    let filteredData = filterData(filteredApplicants, searchInput)

    const statusIcon = {
        "Pending": <MdOutlinePending />,
        "Hired": <MdOutlineVerified />,
        "Rejected": <IoMdCloseCircleOutline />,
        "Interview Scheduled": <SiTicktick />,
        "Interview Completed": <SiTicktick />
    }

    return (
        <div className="panel_container">
            <div className="panel_head bgBlue">
                <div className="header">
                    <h2><span>HR Panel</span><span><MdOutlineAdminPanelSettings /></span></h2>
                    <span className="logout" onClick={() => handleLogout()}><MdLogout /></span>
                </div>
                <Search />
            </div>

            <div className="panel_nav">

                <p className="rounded-md p-4 ">
                    <span className={`cursor-pointer p-4 rounded-l-md  ${toggle ? 'bg-slate-300' : 'bg-slate-400'}`} onClick={() => setToggle(false)}>All Candidate</span>
                    <span className={`cursor-pointer p-4 rounded-r-md ${toggle ? 'bg-slate-400' : 'bg-slate-300'}`} onClick={() => setToggle(true)} >Interview Completed Candidate</span>
                </p>
                <p className="rounded-md p-4 space-x-8 ">
                    <Link to={`/cards/${"Hired"}`} className={`text-green-600 hover:text-green-700 hover:bg-gray-300 p-2 rounded-sm duration-300`} onClick={() => setToggle(false)}>Hired Candidate</Link>
                    <Link to={`/cards/${"Rejected"}`} className={`text-red-600 hover:text-red-700 hover:bg-gray-300 p-2 rounded-sm duration-300`} onClick={() => setToggle(true)} >Rejected Completed Candidate</Link>
                </p>

            </div>

            <div className="table_container">
                <table className="table_wrap">
                    <thead className='table_head'>
                        <tr>
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
                                            {toggle ?
                                                <Link to={`/finaldecision/${datas.email}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                                    Update Decision
                                                </Link>
                                                :
                                                <Link to={`/applicationDetails/${datas.email}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                                    View Details
                                                </Link>

                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* <ul className="w-4/5 space-y-2 ">
                {filteredData.map((applicant, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{applicant.name}</p>
                            <p className="text-sm text-gray-600">Skills: {applicant.skills.join(", ")}</p>
                        </div>
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">View Details</button>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default HRDashboard;
