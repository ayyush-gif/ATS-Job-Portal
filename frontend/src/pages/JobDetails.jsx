import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data.job);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-blue-600">
          Loading...
        </h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold text-red-500">
          Job Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* Header */}
          <div className="border-b pb-6">
            <h1 className="text-4xl font-bold text-blue-600">
              {job.title}
            </h1>

            <p className="text-xl text-gray-700 mt-3">
              {job.company}
            </p>

            <p className="text-gray-500 mt-2">
              📍 {job.location}
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-3">
              Job Description
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {job.skills?.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Recruiter */}
          <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Recruiter Information
            </h2>

            <p className="mb-2">
              <strong>Name:</strong>{" "}
              {job.recruiter?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {job.recruiter?.email}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <Link
              to={`/apply/${job._id}`}
              className="flex-1"
            >
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition">
                Apply Now
              </button>
            </Link>

            <Link
              to="/jobs"
              className="flex-1"
            >
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-xl font-semibold transition">
                Back to Jobs
              </button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default JobDetails;