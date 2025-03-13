import { useState, useEffect } from "react";
import { RiTodoLine } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import { statusColor } from "../../service/statusColor";
import { MdOutlinePending, MdOutlineVerified } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { toast } from "react-toastify";

const InterviewFeedback = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);
    const [feedback, setFeedback] = useState({
        strengths: "",
        weaknesses: "",
        rating: 0,
        decision: "Recommend",
    });

    useEffect(() => {
        const storedCandidates = JSON.parse(localStorage.getItem("applications")) || [];
        const filteredCandidate = storedCandidates.find(
            (cand) => cand.email === id && cand.status === "Interview Scheduled"
        );

        setCandidate(filteredCandidate || null);
    }, [id]);

    const handleStarClick = (starValue) => {
        setFeedback((prev) => ({ ...prev, rating: starValue }));
        console.log(starValue);

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!candidate) return;

        const storedCandidates = JSON.parse(localStorage.getItem("applications")) || [];
        const updatedCandidates = storedCandidates.map((cand) =>
            cand.email === candidate.email ? { ...cand, feedback, status: "Interview Completed" } : cand
        );

        localStorage.setItem("applications", JSON.stringify(updatedCandidates));

        toast.success("Feedback submitted successfully!");
        navigate("/interviewer");
    };

    const statusIcon = {
        "Pending": <MdOutlinePending />,
        "Hired": <MdOutlineVerified />,
        "Rejected": <IoMdCloseCircleOutline />,
        "Interview Scheduled": <SiTicktick />,
        "Interview Completed": <SiTicktick />
    }

    if (!candidate) return <p className="text-center mt-6">Candidate not found or status is not 'Interview Scheduled'.</p>;

    return (
        <div className="panel_container">

            <div className="panel_head_2">
                <h2><span>Interview Feedback</span><span><RiTodoLine /></span></h2>
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

                    <p className="text-2xl">Feedback for {candidate.name}</p>
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded space-y-4">
                        <label className="block font-semibold mt-2">Strengths:</label>
                        <textarea value={feedback.strengths} onChange={(e) => setFeedback({ ...feedback, strengths: e.target.value })} required className="w-full p-2 border border-gray-400 outline-none rounded"></textarea>

                        <label className="block font-semibold mt-2">Weaknesses:</label>
                        <textarea value={feedback.weaknesses} onChange={(e) => setFeedback({ ...feedback, weaknesses: e.target.value })} required className="w-full p-2 border border-gray-400 outline-none rounded"></textarea>

                        {/* <label className="block font-semibold mt-2">Rating (1-5):</label>
                        <select value={feedback.rating} onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })} required className="w-full p-2 border border-gray-400 outline-none rounded">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select> */}
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Rating (1-5):</label>
                            <div className="p-4 flex bg-stone-300 rounded-sm">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`cursor-pointer text-3xl ${star <= feedback.rating ? "!text-yellow-600" : "!text-gray-600"}`}
                                        onClick={() => handleStarClick(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <label className="block font-semibold mt-2">Overall Decision:</label>
                        <select value={feedback.decision} onChange={(e) => setFeedback({ ...feedback, decision: e.target.value })} required className="w-full p-2 border border-gray-400 outline-none rounded">
                            <option value="Recommend" className="!text-green-600">Recommend</option>
                            <option value="Not Recommend" className="!text-red-600">Not Recommend</option>
                        </select>

                        <button type="submit" className="mt-4 w-60 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit Feedback</button>
                    </form>

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

export default InterviewFeedback;
