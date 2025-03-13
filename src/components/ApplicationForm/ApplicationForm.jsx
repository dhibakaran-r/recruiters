import { useState } from "react";
import { toast } from 'react-toastify';
import { FaWpforms } from "react-icons/fa6";

const ApplicationForm = () => {
  const [application, setApplication] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    resume: null,
    interviewers: [],
    feedback: {},
    timeSlot: "",
    experience: "",
    education: "",
    status: "Pending"
  });

  const skills = ["HTML", "CSS", "Javascript", "React", "Java", "MySql", "Python", "Git",]
  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSkill = (skill) => {
    setApplication((prevData) => {
      const newSkills = prevData.skills.includes(skill)
        ? prevData.skills.filter((s) => s !== skill)
        : [...prevData.skills, skill];
      return { ...prevData, skills: newSkills };
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setApplication({
        ...application,
        resume: {
          name: file.name,
          type: file.type,
          url: reader.result,
        },
      });
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push(application);
    localStorage.setItem("applications", JSON.stringify(applications));
    toast.success("Application submitted successfully!");
    setApplication({
      name: "",
      email: "",
      phone: "",
      skills: [],
      resume: null,
      interviewers: [],
      feedback: {},
      timeSlot: "",
      experience: "",
      education: "",
      status: "Pending"
    })
  };


  return (
    <section className="application_container">
      
      <div className="application_head">
        <h2><span>Job Application Form</span><span><FaWpforms /></span></h2>
        <p>Complete your application form.</p>
      </div>

      <form onSubmit={handleSubmit} className="form_container">
        <div className="input_block">
          <div className="inputs">
            <label>Enter your name</label>
            <input className="form_input" type="text" name="name" placeholder="Name" value={application.name} onChange={handleChange} required />
          </div>
          <div className="inputs">
            <label>Enter your E-mail ID</label>
            <input className="form_input" type="email" name="email" placeholder="Email" value={application.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="input_block">
          <div className="inputs">
            <label>Enter your phone NO</label>
            <input className="form_input" type="text" name="phone" placeholder="Phone" value={application.phone} onChange={handleChange} required />
          </div>
          <div className="inputs">
            <label>Upload Resume</label>
            <input className="form_input !border-none" type="file" accept=".pdf,.doc" onChange={handleFileUpload} required />
          </div>
        </div>

        <div className="inputs">
          <label>Skills</label>
          <div className="!mt-2 flex flex-wrap items-center justify-around border border-gray-300 p-4">
            {skills.map((skill, i) => {
              return (
                <div className='flex items-center gap-4' key={i}>
                  <input id={skill} type='checkbox' className='w-4 h-4' value={skill}
                    checked={application.skills.includes(skill)}
                    onChange={() => handleSkill(skill)}
                  />
                  <label className='cursor-pointer' htmlFor={skill}>{skill}</label>
                </div>
              )
            })
            }
          </div>
        </div>
        
        <div className="input_block">
          <div className="inputs">
            <label>Enter work experience</label>
            <textarea className="form_input" name="experience" placeholder="Work Experience" value={application.experience} onChange={handleChange} required></textarea>
          </div>
          <div className="inputs">
            <label>Enter education qualification</label>
            <textarea className="form_input" name="education" placeholder="Education" value={application.education} onChange={handleChange} required></textarea>
          </div>
        </div>

        <button className="form_btn">Submit</button>

      </form>
    </section>
  );
};

export default ApplicationForm;
