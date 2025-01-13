import React, { useState } from "react";
import useAxiosPrivate from '../../../src/fetch/useAxiosPrivate.js';

const ClubGoalForm = () => {
  const axiosPrivate=useAxiosPrivate()  
  const [formData, setFormData] = useState({
    clubName: "",
    clubHeading: "",
    clubGoals: [{ goalHeading: "", information: "" }],
  });
  const [response,setResponse]=useState("");
  const [errorResponse,setErrorResponse]=useState("")
  // Handle input change for main fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle dynamic goal fields
  const handleGoalChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGoals = [...formData.clubGoals];
    updatedGoals[index][name] = value;
    setFormData({ ...formData, clubGoals: updatedGoals });
  };

  // Add a new goal field
  const addGoal = () => {
    setFormData({
      ...formData,
      clubGoals: [...formData.clubGoals, { goalHeading: "", information: "" }],
    });
  };

  // Remove a goal field
  const removeGoal = (index) => {
    const updatedGoals = formData.clubGoals.filter((_, i) => i !== index);
    setFormData({ ...formData, clubGoals: updatedGoals });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response=await axiosPrivate.post('/api/techhub/postGoals',formData)
        setResponse(response.data)
    }
    catch(err){
         setErrorResponse(err.response?.data)
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full  ">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a Club</h1>
      <form onSubmit={handleSubmit} className=" w-3/5 mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Club Name */}
        <div className="mb-4">
          <label htmlFor="clubName" className="block text-gray-700 font-medium mb-2">
            Club Name
          </label>
          <input
             
            type="text"
            id="clubName"
            name="clubName"
            value={formData.clubName}
            onChange={handleInputChange}
            className="w-full p-3 border  rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Club Name"
          />
        </div>

        {/* Club Heading */}
        <div className="mb-4">
          <label htmlFor="clubHeading" className="block text-gray-700 font-medium mb-2">
            Club Heading
          </label>
          <input
            type="text"
            id="clubHeading"
            name="clubHeading"
            value={formData.clubHeading}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Club Heading"
          />
        </div>

        {/* Club Goals */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Club Goals</h3>
          {formData.clubGoals.map((goal, index) => (
            <div key={index} className="mb-4 border rounded-md p-4 bg-gray-50">
              {/* Goal Heading */}
              <div className="mb-2">
                <label
                  htmlFor={`goalHeading-${index}`}
                  className="block text-gray-600 font-medium mb-1"
                >
                  Goal Heading
                </label>
                <input
                  type="text"
                  id={`goalHeading-${index}`}
                  name="goalHeading"
                  value={goal.goalHeading}
                  onChange={(e) => handleGoalChange(index, e)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Goal Heading"
                />
              </div>

              {/* Goal Information */}
              <div>
                <label
                  htmlFor={`information-${index}`}
                  className="block text-gray-600 font-medium mb-1"
                >
                  Information
                </label>
                <textarea
                  id={`information-${index}`}
                  name="information"
                  value={goal.information}
                  onChange={(e) => handleGoalChange(index, e)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Goal Information"
                ></textarea>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeGoal(index)}
                className="mt-4 text-white hover:underline w-fit rounded-md p-1.5 sm:p-2 bg-red-500 text-sm"
              >
                Remove Goal
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex w-full gap-2 justify-end">

          <button
            type="button"
            onClick={addGoal}
            className="w-fit py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all"
          >
            Add Goal
          </button>

        <button
          type="submit"
          className="w-fit py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
        >
          Submit
        </button>
        </div>
        <div className="w-full text-center p-4">
         {response?<p className="text-green-500 text-xs sm:text-base">{response}</p>:errorResponse?<p>{errorResponse}</p>:<></>}   
        </div>
      </form>
    </div>
  );
};

export default ClubGoalForm;
