import { useState, useEffect } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";
import { statusColor } from "../../service/statusColor";
import { MdOutlinePending, MdOutlineVerified } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { toast } from "react-toastify";

const HRFinalDecision = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const storedCandidates = JSON.parse(localStorage.getItem("applications")) || [];
        const selectedCandidate = storedCandidates.find((cand) => cand.email === id && cand.status === "Interview Completed");
        setCandidate(selectedCandidate || null);
    }, [id]);

    const handleDecision = (decision) => {
        if (!candidate) return;

        const storedCandidates = JSON.parse(localStorage.getItem("applications")) || [];
        const updatedCandidates = storedCandidates.map((cand) =>
            cand.email === candidate.email ? { ...cand, status: decision } : cand
        );

        localStorage.setItem("applications", JSON.stringify(updatedCandidates));

        if (decision === "Hired") {
            const hiredCandidates = JSON.parse(localStorage.getItem("hiredCandidates")) || [];
            localStorage.setItem("hiredCandidates", JSON.stringify([...hiredCandidates, { ...candidate, status: "Hired" }]));
        } else {
            const rejectedCandidates = JSON.parse(localStorage.getItem("rejectedCandidates")) || [];
            localStorage.setItem("rejectedCandidates", JSON.stringify([...rejectedCandidates, { ...candidate, status: "Rejected" }]));
        }

        toast.info(`Candidate marked as ${decision}!`);
        navigate("/hrdashboard");
    };

  const statusIcon = {
        "Pending": <MdOutlinePending />,
        "Hired": <MdOutlineVerified />,
        "Rejected": <IoMdCloseCircleOutline />,
        "Interview Scheduled": <SiTicktick />,
        "Interview Completed": <SiTicktick />
    }

    if (!candidate) return <p className="text-center mt-6">Candidate not found or status is not 'Interview Completed'.</p>;

    return (
        <div className="panel_container">

            <div className="panel_head_2">
                <h2><span>Final Decision for {candidate.name}</span><span><BiSolidUserDetail /></span></h2>
            </div>
            
            <div className="details_container">
                <div className="detail_card_wrap">
                    <div className="detail_head_wrap">
                        <p><strong>Candidate Name:</strong> <span>{candidate.name}</span></p>
                        <p className="flex !flex-row gap-4"><strong>Status:</strong> <span className={`!m-0 flex gap-4 ${statusColor[candidate.status]}`}>{candidate.status || "Pending"}{statusIcon[candidate.status]}</span></p>
                    </div>
                    <p><strong>Email:</strong> <span>{candidate.email}</span></p>
                    <p><strong>Phone:</strong> <span>{candidate.phone}</span></p>
                    <p><strong>Skills:</strong> <span>{candidate.skills.join(", ")}</span></p>

                    <div className="w-full space-y-4">
                        <h3 className="text-2xl font-semibold">Interviewer Feedback</h3>
                        <p clas><strong>Strengths:</strong> <span>{candidate.feedback?.strengths}</span></p>
                        <p clas><strong>Weaknesses:</strong> <span>{candidate.feedback?.weaknesses}</span></p>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Rating:</label>
                            <div className="p-4 flex bg-stone-300 rounded-sm">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`cursor-pointer text-3xl ${star <= candidate.feedback.rating ? "!text-yellow-600" : "!text-gray-600"}`}
                                        
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="ms-4 flex flex-col"><strong>Decision:</strong> <span className={`${candidate.feedback?.decision === "Recommend" ? '!text-green-600' : '!text-red-600'} font-bold`}>{candidate.feedback?.decision}</span></p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleDecision("Hired")}
                            className="w-60 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Hire
                        </button>
                        <button
                            onClick={() => handleDecision("Rejected")}
                            className="w-60 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </div>
                </div>

                {candidate.resume && (
                    <div className="w-1/2 mt-4">
                        <h3 className="font-semibold">Resume</h3>
                        {candidate.resume.type === "application/pdf" ? (
                            <iframe src={candidate.resume.url} className="resume_block"></iframe>
                        ) : (
                            <p className="text-gray-600 mt-2">Preview not available for this file type.</p>
                        )}
                        <a
                            href={candidate.resume}
                            download={candidate.resume.name}
                            className="mt-2 inline-block text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Download Resume
                        </a>
                    </div>
                )}

            </div>


        </div>
    );
};

export default HRFinalDecision;
