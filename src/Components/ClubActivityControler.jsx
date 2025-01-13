import React, { useState } from 'react';

const ClubActivityControler= () => {
  // State for form fields
  const [formData, setFormData] = useState({
    eventTitle: '',
    clubName: '',
    time: '',
    date: '',
    venue: '',
    description: '',
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Perform further actions like API calls here
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-10 px-5">
      <div className="w-full md:w-3/4 lg:w-3/5  bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Club Activity</h1>
        <form  onSubmit={handleSubmit}>
          {/* Event Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="eventTitle">
              Event Title
            </label>
            <input
              type="text"
              id="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Club Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="clubName">
              Club Name
            </label>
            <input
              type="text"
              id="clubName"
              value={formData.clubName}
              onChange={handleChange}
              placeholder="Enter club name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Time */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Venue */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="venue">
              Venue
            </label>
            <input
              type="text"
              id="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter venue"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center flex justify-end">
            <button
              type="submit"
              className="w-fit bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubActivityControler;
