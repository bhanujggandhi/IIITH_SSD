import React, { useState } from "react";

const BACKEND_URI = "http://localhost:4000/std/";

const AddQuery = () => {
  const [exam_name, setExam_name] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [question_num, setQuestion_num] = useState("");
  const [ta_roll, setTa_roll] = useState("");
  const [std_roll, setStd_roll] = useState("");
  const [ta_comment, setTa_comment] = useState("");
  const [std_comment, setStd_comment] = useState("");
  const [IsActive, setIsActive] = useState("");
  const email = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exam_name,
        course_name,
        question_num,
        ta_roll,
        ta_comment,
        std_comment,
        std_roll,
        IsActive,
      }),
    };

    var res = await fetch(BACKEND_URI + email + "/addQuery", requestOptions);
    if (res === 200) {
      console.log("Submitted");
    } else {
      console.log("nai hua");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor=''>Exame Name</label>
      <input
        type='text'
        value={exam_name}
        onChange={(e) => setExam_name(e.target.value)}
      />
      <label htmlFor=''>Course Name</label>
      <input
        type='text'
        value={course_name}
        onChange={(e) => setCourse_name(e.target.value)}
      />

      <input
        type='text'
        value={question_num}
        onChange={(e) => setQuestion_num(e.target.value)}
      />
      <input
        type='text'
        value={ta_roll}
        onChange={(e) => setTa_roll(e.target.value)}
      />
      <input
        type='text'
        value={std_roll}
        onChange={(e) => setStd_roll(e.target.value)}
      />
      <textarea
        type='text'
        value={ta_comment}
        onChange={(e) => setTa_comment(e.target.value)}
      />
      <textarea
        type='text'
        value={std_comment}
        onChange={(e) => setStd_comment(e.target.value)}
      />
      <select value={IsActive} onChange={(e) => setIsActive(e.target.value)}>
        <option value='' disabled>
          Choose
        </option>
        <option value='true'>True</option>
        <option value='false' disabled>
          False
        </option>
      </select>
      <button>Submit</button>
    </form>
  );
};

export default AddQuery;
