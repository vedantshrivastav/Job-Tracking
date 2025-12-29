"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
/* ---------------- TYPES ---------------- */

type JobFromBackend = {
  _id: string;
  JobTitle?: string;
  company: string;
  status: string;
  appliedDate: string;
  updatedAt?: string;
};

type JobUI = {
  role: string;
  company: string;
  status: string;
  appliedDate: string;
  updatedDate: string;
};

/* ---------------- API ---------------- */

const fetchJobs = async (): Promise<JobFromBackend[]> => {
  const token = localStorage.getItem("token");
  console.log("token on frontend", token);
  const res = await axios.get("http://localhost:3001/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("all jobs", res.data);
  return res.data.all_jobs; // ✅ matches backend
};

/* ---------------- HELPERS ---------------- */

const normalizeJobs = (jobs: JobFromBackend[]): JobUI[] => {
  return jobs.map((job) => ({
    role: job.JobTitle ?? "—",
    company: job.company,
    status: job.status,
    appliedDate: new Date(job.appliedDate).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    updatedDate: "Just now", // later: derive from timeline/updatedAt
  }));
};

const Spinner = () => (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

/* ---------------- COMPONENT ---------------- */

const RenderJobs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  console.log("frontend dara", data);
  const jobs = useMemo(() => (data ? normalizeJobs(data) : []), [data]);

  console.log("frontend jobs", jobs);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    jobTitle: "",
    company: "",
    location: "",
    source: "",
    jobUrl: "",
    status: "Applied",
    appliedDate: "",
    followUpDate: "",
    resumeId: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddJob = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3001/job", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job added successfully");
      setIsModalOpen(false); // ✅ close only on success
    } catch (error) {
      console.error(error);
      toast.error("Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  console.log("filteredJobs", filteredJobs);

  if (isLoading) return <p>Loading jobs...</p>;
  if (isError) return <p>Failed to load jobs</p>;

  return (
    <div className="space-y-8 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Jobs</h1>
          <p className="text-zinc-500 text-sm mt-1">
            All your tracked applications in one place.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-zinc-800 shadow-sm cursor-pointer"
        >
          + Add Job
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3 top-2.5 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search role or company..."
            className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-md text-sm focus:ring-1 focus:ring-zinc-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg">
          {["All", "Applied", "Interviewing", "Offer", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md ${
                  statusFilter === status
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      {filteredJobs.length > 0 ? (
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-100">
              {filteredJobs.map((job, i) => (
                <tr key={i} className="hover:bg-zinc-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{job.role}</p>
                    <p className="text-xs text-zinc-500">{job.company}</p>
                  </td>
                  <td className="px-6 py-4">{job.status}</td>
                  <td className="px-6 py-4">{job.appliedDate}</td>
                  <td className="px-6 py-4 text-xs text-zinc-400">
                    {job.updatedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-zinc-500 text-center">No jobs found.</p>
      )}
      {/*MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
            >
              <XIcon className="cursor-pointer" size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-zinc-900 font-mono">
                TRACK NEW JOB
              </h2>
              <p className="text-sm text-zinc-500">
                Track a new job application
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                Role
              </label>
              <input
                name="jobTitle"
                placeholder="Job Title"
                onChange={handleChange}
                className="w-full border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
              />
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                Company
              </label>
              <input
                name="company"
                placeholder="Company"
                onChange={handleChange}
                className="w-full border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                    Location
                  </label>
                  <input
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                    Source
                  </label>
                  <input
                    name="source"
                    placeholder="Source (LinkedIn, Referral)"
                    onChange={handleChange}
                    className="border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
                  />
                </div>
              </div>
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                Job URL
              </label>
              <input
                name="jobUrl"
                placeholder="Job URL"
                onChange={handleChange}
                className="w-full border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
              />

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                    CURRENT STATUS
                  </label>
                  <select
                    name="status"
                    onChange={handleChange}
                    className="border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
                  >
                    <option>Applied</option>
                    <option>Interviewing</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                    APPLIED DATE
                  </label>
                  <input
                    type="date"
                    name="appliedDate"
                    onChange={handleChange}
                    className="border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                    FOLLOW-UP DATE
                  </label>
                  <input
                    type="date"
                    name="followUpDate"
                    onChange={handleChange}
                    className="border border-zinc-200 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-zinc-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddJob}
                disabled={loading}
                className={`px-4 py-2 text-sm rounded-md flex items-center justify-center gap-2
    ${
      loading
        ? "bg-zinc-400 cursor-not-allowed"
        : "bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer"
    }`}
              >
                {loading ? (
                  <>
                    <Spinner />
                    Saving...
                  </>
                ) : (
                  "Save Job"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderJobs;
