import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pipeline, setPipeline] =
    useState({
      Applied: 0,
      Shortlisted: 0,
      Interview: 0,
      Hired: 0,
      Rejected: 0,
    });

  useEffect(() => {
    fetchMyJobs();
    fetchPipeline();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/jobs/my-jobs",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data.jobs || []);
    } catch (error) {
      console.log(
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPipeline =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await API.get(
          "/application/pipeline",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setPipeline(
          res.data.pipeline
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Recruiter Dashboard
        </h1>

        {/* Top Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-500">
              Total Jobs
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-2">
              {jobs.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-500">
              Active Jobs
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {jobs.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-500">
              ATS Enabled
            </h3>

            <p className="text-4xl font-bold text-purple-600 mt-2">
              ✓
            </p>
          </div>

        </div>

        {/* Hiring Pipeline */}
        <h2 className="text-2xl font-bold mb-4">
          Hiring Pipeline
        </h2>

        <div className="grid md:grid-cols-5 gap-4 mb-10">

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">
              Applied
            </p>

            <h2 className="text-3xl font-bold">
              {pipeline.Applied}
            </h2>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl shadow">
            <p className="text-yellow-700">
              Shortlisted
            </p>

            <h2 className="text-3xl font-bold">
              {pipeline.Shortlisted}
            </h2>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl shadow">
            <p className="text-blue-700">
              Interview
            </p>

            <h2 className="text-3xl font-bold">
              {pipeline.Interview}
            </h2>
          </div>

          <div className="bg-green-50 p-5 rounded-xl shadow">
            <p className="text-green-700">
              Hired
            </p>

            <h2 className="text-3xl font-bold">
              {pipeline.Hired}
            </h2>
          </div>

          <div className="bg-red-50 p-5 rounded-xl shadow">
            <p className="text-red-700">
              Rejected
            </p>

            <h2 className="text-3xl font-bold">
              {pipeline.Rejected}
            </h2>
          </div>

        </div>

        {loading ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">
              Loading...
            </h2>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold">
              No Jobs Posted Yet
            </h2>

            <Link to="/create-job">
              <button className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                Create First Job
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">
              My Posted Jobs
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                >
                  <h2 className="text-2xl font-bold text-blue-600">
                    {job.title}
                  </h2>

                  <p className="font-semibold text-gray-700 mt-2">
                    {job.company}
                  </p>

                  <p className="text-gray-500 mt-1">
                    📍 {job.location}
                  </p>

                  <p className="text-gray-600 mt-4">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">

                    <Link
                      to={`/jobs/${job._id}`}
                      className="flex-1"
                    >
                      <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                        View Job
                      </button>
                    </Link>

                    <Link
                      to={`/applicants/${job._id}`}
                      className="flex-1"
                    >
                      <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
                        Applicants
                      </button>
                    </Link>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default Dashboard;