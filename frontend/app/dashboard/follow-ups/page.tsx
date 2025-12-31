"use client";
import React, { useState, useMemo, useEffect } from "react";

interface FollowUpItem {
  role: string;
  company: string;
  currentStatus: string;
  followUpDate: string;
  lastContacted: string;
  notes: string;
  status: "Upcoming" | "Overdue" | "Completed";
}
interface FollowUpApiResponse {
  _id: string;
  scheduledFor: string;
  sent: boolean;
  sentAt?: string | null;
  jobId: {
    _id: string;
    JobTitle: string;
    company: string;
    status: string;
    lastUpdate?: string;
    notes: [string];
  };
}

const INITIAL_FOLLOW_UPS: FollowUpItem[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Linear",
    currentStatus: "Interviewing",
    followUpDate: "Mar 20, 2024",
    lastContacted: "2d ago",
    notes: "Waiting for feedback from tech lead.",
    status: "Upcoming",
  },
  {
    role: "Fullstack Developer",
    company: "Vercel",
    currentStatus: "Applied",
    followUpDate: "Mar 10, 2024",
    lastContacted: "5d ago",
    notes: "Reach out if no response by EOW.",
    status: "Overdue",
  },
  {
    role: "Product Engineer",
    company: "Raycast",
    currentStatus: "Rejected",
    followUpDate: "Mar 08, 2024",
    lastContacted: "1w ago",
    notes: "Ask for feedback on interview performance.",
    status: "Completed",
  },
  {
    role: "Software Engineer",
    company: "Railway",
    currentStatus: "Offer",
    followUpDate: "Mar 25, 2024",
    lastContacted: "1d ago",
    notes: "Discuss equity breakdown with HM.",
    status: "Upcoming",
  },
];

const FollowUpsView: React.FC = () => {
  const [followUps, setFollowUps] = useState<FollowUpItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchFollowUps() {
      try {
        const res = await fetch("http://localhost:3001/follow-ups", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        console.log("this is the data from the followup endpoint", data);

        const transformed: FollowUpItem[] = data.map(
          (item: FollowUpApiResponse) => ({
            role: item.jobId.JobTitle,
            company: item.jobId.company,
            currentStatus: item.jobId.status,
            followUpDate: new Date(item.scheduledFor).toLocaleDateString(
              "en-US",
              { month: "short", day: "2-digit", year: "numeric" }
            ),
            lastContacted: item.jobId.lastUpdate
              ? timeAgo(new Date(item.jobId.lastUpdate))
              : "—",
            notes: item.jobId.notes,
            status: getFollowUpStatus(item.scheduledFor, item.sent),
          })
        );

        setFollowUps(transformed);
      } catch (err) {
        console.error("Failed to fetch follow-ups", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFollowUps();
  }, []);

  const filteredFollowUps = useMemo(() => {
    return followUps.filter((item) => {
      const matchesSearch =
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [followUps, searchQuery, statusFilter]);

  if (loading) {
    return <div className="text-sm text-zinc-500">Loading follow-ups…</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Follow-Ups</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Track and manage upcoming follow-ups with recruiters.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors shadow-sm self-start"
        >
          + Add Follow-Up
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
            placeholder="Search company or role..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg">
          {["All", "Upcoming", "Overdue", "Completed"].map((status) => (
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
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Sort by:</span>
          <select className="bg-transparent border-none text-xs font-semibold text-zinc-600 focus:ring-0 cursor-pointer hover:text-zinc-900">
            <option>Next follow-up date</option>
            <option>Company</option>
            <option>Status</option>
          </select>
        </div>
      </div>

      {/* Follow-Ups Table */}
      {filteredFollowUps.length > 0 ? (
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Role & Company
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Stage Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Follow-Up Date
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredFollowUps.map((item, i) => (
                <tr
                  key={i}
                  className={`hover:bg-zinc-50/50 transition-colors group cursor-pointer ${
                    item.status === "Overdue" ? "bg-zinc-50/20" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-zinc-900">{item.role}</p>
                    <p className="text-xs text-zinc-500">{item.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.currentStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`text-sm font-medium ${
                          item.status === "Overdue"
                            ? "text-orange-600"
                            : "text-zinc-900"
                        }`}
                      >
                        {item.followUpDate}
                      </span>
                      <span className="text-[10px] text-zinc-400 mono uppercase tracking-wider">
                        LAST: {item.lastContacted}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 italic">
                      {item.notes}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors">
                      <MoreIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center space-y-4 bg-white border border-dashed border-zinc-200 rounded-lg">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">
              No follow-ups scheduled
            </h4>
            <p className="text-xs text-zinc-500 mt-1">
              Add follow-ups to stay on top of your applications.
            </p>
          </div>
          <button
            onClick={() => {
              setModalOpen(true);
            }}
            className="bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            Add Follow-Up
          </button>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest font-mono">
                New Follow-up
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 p-1"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                  Target Application
                </label>
                <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm text-zinc-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all">
                  <option>Select an active application...</option>
                  <option>Senior Frontend Engineer @ Linear</option>
                  <option>Fullstack Developer @ Vercel</option>
                  <option>Software Engineer @ Railway</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm text-zinc-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm text-zinc-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                  Notes / Reminder Message
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Check in with recruiter about the take-home test result..."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all resize-none"
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 bg-zinc-900 text-white text-xs font-bold rounded-md hover:bg-zinc-800 transition-all shadow-sm cursor-pointer"
              >
                Schedule Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Internal Sub-components */

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Interviewing: "bg-blue-50 text-blue-600 border-blue-100",
    Applied: "bg-zinc-50 text-zinc-600 border-zinc-100",
    Rejected: "bg-red-50 text-red-600 border-red-100",
    Offer: "bg-green-50 text-green-600 border-green-100",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${
        styles[status] || styles["Applied"]
      }`}
    >
      {status}
    </span>
  );
};

const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);

const MoreIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
    ></path>
  </svg>
);
function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000 / 60 / 60 / 24);
  if (diff === 0) return "Today";
  if (diff === 1) return "1d ago";
  return `${diff}d ago`;
}
function getFollowUpStatus(
  scheduledFor: string,
  sent: boolean
): "Upcoming" | "Overdue" | "Completed" {
  if (sent) return "Completed";
  return new Date(scheduledFor) < new Date() ? "Overdue" : "Upcoming";
}
const CloseIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

export default FollowUpsView;
