import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            ATS Job Portal
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
            Find your dream job and analyze your resume
            with our built-in ATS scoring system.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300">
                Browse Jobs
              </button>
            </Link>

            <Link to="/register">
              <button className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">

          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">📄</div>

            <h3 className="text-2xl font-bold mb-3">
              Resume Upload
            </h3>

            <p className="text-gray-600">
              Upload your resume in PDF format and
              apply instantly to jobs.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">🎯</div>

            <h3 className="text-2xl font-bold mb-3">
              ATS Analysis
            </h3>

            <p className="text-gray-600">
              Get ATS scores based on skill matching
              between resumes and job requirements.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">👨‍💼</div>

            <h3 className="text-2xl font-bold mb-3">
              Recruiter Dashboard
            </h3>

            <p className="text-gray-600">
              Manage jobs, track applicants, and
              review ATS scores efficiently.
            </p>
          </div>

        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-10 mt-24 text-center">

          <div>
            <h2 className="text-5xl font-bold mb-2">
              100+
            </h2>

            <p className="text-blue-100 text-lg">
              Jobs Posted
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold mb-2">
              500+
            </h2>

            <p className="text-blue-100 text-lg">
              Applications
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold mb-2">
              ATS
            </h2>

            <p className="text-blue-100 text-lg">
              Resume Analysis
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-28">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Land Your Dream Job?
          </h2>

          <p className="text-blue-100 mb-8 text-lg">
            Join recruiters and job seekers using
            ATS-powered hiring.
          </p>

          <Link to="/register">
            <button className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition duration-300">
              Create Free Account
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;