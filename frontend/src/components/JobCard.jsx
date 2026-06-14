import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      <Link to={`/jobs/${job._id}`}>
        <h2 className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          {job.title}
        </h2>
      </Link>

      <p className="text-lg font-semibold text-gray-700 mt-2">
        {job.company}
      </p>

      <p className="text-gray-500 mt-1">
        📍 {job.location}
      </p>

      <p className="text-gray-600 mt-4 line-clamp-3">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {job.skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500">
          Recruiter
        </p>

        <p className="font-semibold">
          {job.recruiter?.name}
        </p>
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className="mt-6 inline-block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        View Details
      </Link>

    </div>
  );
}

export default JobCard;