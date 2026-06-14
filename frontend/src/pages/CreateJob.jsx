import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    skills: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/jobs",
        {
          ...formData,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Created Successfully");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Create New Job
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="block font-semibold mb-2">
                Job Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Frontend Developer"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Company
              </label>

              <input
                type="text"
                name="company"
                placeholder="Infosys"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Bangalore"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                placeholder="React, JavaScript, HTML, CSS"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <p className="text-sm text-gray-500 mt-2">
                Separate skills with commas.
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Job Description
              </label>

              <textarea
                name="description"
                rows="6"
                placeholder="Describe the job requirements..."
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Create Job
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateJob;