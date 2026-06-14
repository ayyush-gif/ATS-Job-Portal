import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ApplyJob() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please select a resume");
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      const formData = new FormData();

      formData.append("jobId", id);
      formData.append("resume", resume);

      const res = await API.post(
        "/application/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);

      alert(
        "Application Submitted Successfully"
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Application Failed"
      );
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80)
      return "bg-green-500";

    if (score >= 60)
      return "bg-yellow-500";

    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-8">
            Apply For Job
          </h1>

          <form onSubmit={handleSubmit}>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center">

              <p className="text-gray-600 mb-4">
                Upload Resume (PDF)
              </p>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setResume(
                    e.target.files[0]
                  )
                }
                className="block mx-auto"
              />

              {resume && (
                <p className="mt-4 text-green-600 font-medium">
                  {resume.name}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Submit Application
            </button>

          </form>

        </div>

        {result && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

            <h2 className="text-3xl font-bold mb-6">
              ATS Analysis
            </h2>

            <div className="mb-8">

              <div className="flex justify-between mb-2">

                <span className="font-semibold">
                  ATS Score
                </span>

                <div className="text-right">

                  <span className="font-bold">
                    {result.atsScore}%
                  </span>

                  <p className="text-sm mt-1">
                    {result.atsScore >= 80
                      ? "🟢 Excellent Match"
                      : result.atsScore >= 60
                      ? "🟡 Good Match"
                      : "🔴 Needs Improvement"}
                  </p>

                </div>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-6">

                <div
                  className={`${getScoreColor(
                    result.atsScore
                  )} h-6 rounded-full`}
                  style={{
                    width: `${result.atsScore}%`,
                  }}
                ></div>

              </div>

            </div>

            <div className="mb-6">

              <h3 className="text-xl font-bold mb-3">
                Matched Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {result.matchedSkills?.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                    >
                      ✓ {skill}
                    </span>
                  )
                )}
              </div>

            </div>

            <div>

              <h3 className="text-xl font-bold mb-3">
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    >
                      ✗ {skill}
                    </span>
                  )
                )}
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ApplyJob;