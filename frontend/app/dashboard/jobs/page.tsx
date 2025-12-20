"use client";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
// import { MoreIcon, StatusBadge } from "../dashboard/page";
const initialJobs = [
  {
    role: "Senior Frontend Engineer",
    company: "Linear",
    status: "Interviewing",
    appliedDate: "Mar 12, 2024",
    updatedDate: "2h ago",
  },
  {
    role: "Fullstack Developer",
    company: "Vercel",
    status: "Applied",
    appliedDate: "Mar 11, 2024",
    updatedDate: "1d ago",
  },
  {
    role: "Product Engineer",
    company: "Raycast",
    status: "Rejected",
    appliedDate: "Mar 08, 2024",
    updatedDate: "4d ago",
  },
  {
    role: "Software Engineer",
    company: "Railway",
    status: "Offer",
    appliedDate: "Mar 05, 2024",
    updatedDate: "1w ago",
  },
  {
    role: "Design Engineer",
    company: "Figma",
    status: "Interviewing",
    appliedDate: "Mar 04, 2024",
    updatedDate: "1w ago",
  },
  {
    role: "Infrastructure Engineer",
    company: "Cloudflare",
    status: "Applied",
    appliedDate: "Feb 28, 2024",
    updatedDate: "2w ago",
  },
  {
    role: "React Native Developer",
    company: "Expo",
    status: "Interviewing",
    appliedDate: "Feb 25, 2024",
    updatedDate: "2w ago",
  },
  {
    role: "Growth Engineer",
    company: "PostHog",
    status: "Rejected",
    appliedDate: "Feb 20, 2024",
    updatedDate: "3w ago",
  },
];
const RenderJobs = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);
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
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors shadow-sm self-start"
        >
          + Add Job
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search role or company..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
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
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
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
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Sort by:</span>
          <select className="bg-transparent border-none text-xs font-semibold text-zinc-600 focus:ring-0 cursor-pointer hover:text-zinc-900">
            <option>Recently added</option>
            <option>Company</option>
            <option>Status</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      {filteredJobs.length > 0 ? (
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Role & Company
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredJobs.map((job, i) => (
                <tr
                  key={i}
                  className="hover:bg-zinc-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-zinc-900">{job.role}</p>
                    <p className="text-xs text-zinc-500">{job.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    {/* <StatusBadge status={job.status} /> */}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-zinc-500">{job.appliedDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-zinc-400 mono">
                      {job.updatedDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors">
                      {/* <MoreIcon /> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t border-zinc-200 bg-zinc-100/60 flex items-center justify-center cursor-pointer">
            <button className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
              Load more
            </button>
          </div>
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center space-y-4 bg-white border border-dashed border-zinc-200 rounded-lg">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">
              No jobs tracked yet
            </h4>
            <p className="text-xs text-zinc-500 mt-1">
              Add your first application to get started.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Add Job
          </button>
        </div>
      )}
    </div>
  );
};

export default RenderJobs;
