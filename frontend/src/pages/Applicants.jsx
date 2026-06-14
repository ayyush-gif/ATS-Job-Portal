import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        `/application/job/${jobId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setApplications(
        res.data.applications
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    applicationId,
    status
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.put(
        `/application/status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchApplicants();
    } catch (error) {
      console.log(error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80)
      return "bg-green-100 text-green-700";

    if (score >= 60)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Applicants
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Applicants Yet
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-2xl font-bold">
                      {app.user?.name}
                    </h2>

                    <p className="text-gray-500">
                      {app.user?.email}
                    </p>
                  </div>

                  <div className="text-right">

                    <span
                      className={`px-4 py-2 rounded-full font-bold ${getScoreColor(
                        app.atsScore
                      )}`}
                    >
                      {app.atsScore}%
                    </span>

                    <p className="mt-2 text-sm font-medium">
                      {app.atsScore >= 80
                        ? "🟢 Excellent Match"
                        : app.atsScore >= 60
                        ? "🟡 Good Match"
                        : "🔴 Needs Improvement"}
                    </p>

                  </div>

                </div>

                {/* Status */}
                <div className="mt-5">

                  <p className="font-semibold mb-2">
                    Current Status
                  </p>

                  <p className="mb-3">

                    {app.status ===
                      "Applied" &&
                      "📄 Applied"}

                    {app.status ===
                      "Shortlisted" &&
                      "🟡 Shortlisted"}

                    {app.status ===
                      "Interview" &&
                      "🔵 Interview"}

                    {app.status ===
                      "Rejected" &&
                      "🔴 Rejected"}

                    {app.status ===
                      "Hired" &&
                      "🟢 Hired"}

                  </p>

                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(
                        app._id,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg p-3"
                  >
                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Shortlisted">
                      Shortlisted
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                    <option value="Hired">
                      Hired
                    </option>
                  </select>

                </div>

                {/* Matched Skills */}
                <div className="mt-6">

                  <h3 className="font-bold mb-3">
                    Matched Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {app.matchedSkills?.map(
                      (
                        skill,
                        index
                      ) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                          ✓ {skill}
                        </span>
                      )
                    )}
                  </div>

                </div>

                {/* Missing Skills */}
                <div className="mt-6">

                  <h3 className="font-bold mb-3">
                    Missing Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {app.missingSkills?.map(
                      (
                        skill,
                        index
                      ) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        >
                          ✗ {skill}
                        </span>
                      )
                    )}
                  </div>

                </div>

                {/* Resume Button */}
                <a
                  href={`http://localhost:5000/uploads/resumes/${app.resumeUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block w-full text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  View Resume
                </a>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Applicants;