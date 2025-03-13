import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiSolidUserDetail } from "react-icons/bi";
import './ApplicationDetails.css'
import { statusColor } from "../../service/statusColor";
import { MdOutlinePending, MdOutlineVerified } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { toast } from "react-toastify";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [selectedInterviewers, setSelectedInterviewers] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const availableInterviewers = ["John Doe", "Jane Smith", "Robert Brown", "Emily Davis", "Michael Lee"];

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("applications")) || [];
    const filteredCandidate = storedCandidates.find(
      (cand) => cand.email === id);

    setCandidate(filteredCandidate || null);
  }, [id]);

  const handleCheckboxChange = (interviewer) => {
    setSelectedInterviewers((prev) => {
      if (prev.includes(interviewer)) {
        return prev.filter((i) => i !== interviewer);
      } else if (prev.length < 3) {
        return [...prev, interviewer];
      }
      return prev;
    });
  };

  const handleScheduleInterview = () => {
    if (selectedInterviewers.length !== 3 || !timeSlot) {
      toast.warning("Please select exactly 3 interviewers and a time slot.");
      return;
    }

    const storedApplicants = JSON.parse(localStorage.getItem("applications")) || [];
    const updatedApplicants = storedApplicants.map((cand) =>
      cand.email === candidate.email ? {
        ...cand,
        interviewers: selectedInterviewers,
        timeSlot,
        status: "Interview Scheduled",
      } : cand
    );

    localStorage.setItem("applications", JSON.stringify(updatedApplicants));
    toast.success("Interview Scheduled Successfully!");
    navigate("/hrdashboard"); // Redirect back to HR Dashboard
  };

  const statusIcon = {
        "Pending": <MdOutlinePending />,
        "Hired": <MdOutlineVerified />,
        "Rejected": <IoMdCloseCircleOutline />,
        "Interview Scheduled": <SiTicktick />,
        "Interview Completed": <SiTicktick />
    }

  if (!candidate) return <p className="text-center mt-6">Loading candidate details...</p>;

  return (
    <div className="panel_container">

      <div className="panel_head_2">
        <h2><span>Candidate Details</span><span><BiSolidUserDetail /></span></h2>
      </div>

      <div className="details_container">
        <div className="detail_card_wrap">
          <div className="detail_head_wrap">
            <p><strong>Candidate Name:</strong> <span>{candidate.name}</span></p>
            <p className="flex !flex-row gap-4"><strong>Status:</strong> <span className={`!m-0 flex items-start gap-2 2xl:gap-4 ${statusColor[candidate.status]}`}>{candidate.status || "Pending"}{statusIcon[candidate.status]}</span></p>
          </div>
          <p><strong>Email:</strong> <span>{candidate.email}</span></p>
          <p><strong>Phone:</strong> <span>{candidate.phone}</span></p>
          <p><strong>Skills:</strong> <span>{candidate.skills.join(", ")}</span></p>
          <div className="mt-4">
            <label className="block font-semibold mb-2">Select Interviewers (Choose 3):</label>
            {availableInterviewers.map((interviewer) => (
              <div key={interviewer} className="flex items-center space-x-2 ms-4">
                <input
                  type="checkbox"
                  id={interviewer}
                  value={interviewer}
                  checked={selectedInterviewers.includes(interviewer)}
                  onChange={() => handleCheckboxChange(interviewer)}
                  disabled={selectedInterviewers.length >= 3 && !selectedInterviewers.includes(interviewer)}
                  className="w-4 h-4 text-blue-500"
                />
                <label htmlFor={interviewer}>{interviewer}</label>
              </div>
            ))}
          </div>

          {/* <div className="mt-2"> */}
          <p><strong>Selected Interviewers:</strong> <span>{candidate.interviewers.length > 0 ? candidate.interviewers.map((c) => c + ", ") || "None" : selectedInterviewers.join(", ") || "None"}</span></p>
          {/* </div> */}

          <div className="mt-4">
            <label className="block font-semibold mb-2">Select Time Slot:</label>
            <input type="datetime-local" value={candidate.timeSlot != "" ? candidate.timeSlot : timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="ms-4 p-2 border rounded" />
          </div>

          <button onClick={handleScheduleInterview} className={`mt-4 w-60 text-white p-2 rounded ${candidate.status !== "Pending" ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`} disabled={candidate.status !== "Pending"}>
            Schedule Interview
          </button>
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

export default ApplicationDetails;
