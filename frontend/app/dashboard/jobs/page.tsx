"use client";

import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Jobs</h1>
          <p className="text-zinc-500 text-sm mt-1">
            All your tracked applications in one place.
          </p>
        </div>
        <button className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-zinc-800 shadow-sm">
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
    </div>
  );
};

export default RenderJobs;
