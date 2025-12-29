"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/* ---------------- Types ---------------- */
const STATUS_ORDER = [
  "Applied",
  "HR Call",
  "Interview 1",
  "Interview 2",
  "Test",
  "Offer",
  "Rejected",
  "Ghosted",
];

const followUps = [
  { target: "GitHub", action: "Send thank you note", due: "Today" },
  { target: "Stripe", action: "Check application status", due: "Tomorrow" },
];

const ACTIVITY_DATA = [
  { week: "Feb 12", apps: 4 },
  { week: "Feb 19", apps: 7 },
  { week: "Feb 26", apps: 3 },
  { week: "Mar 04", apps: 10 },
  { week: "Mar 11", apps: 4 },
];

const FUNNEL_STEPS = [
  { label: "Applications", value: 28, percentage: "100%" },
  { label: "HR Screening", value: 12, percentage: "42.8%" },
  { label: "Technical Rounds", value: 6, percentage: "21.4%" },
  { label: "Final Rounds", value: 2, percentage: "7.1%" },
  { label: "Offers", value: 1, percentage: "3.5%" },
];

type StatusCount = {
  name: string;
  total: number;
};

type RecentJob = {
  JobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
};

type DashboardStats = {
  totalApplications: number;
  activeInterviews: number;
  offers: number;
  followUps: number;
};

type DashboardResponse = {
  stats: DashboardStats;
  statusBreakdown: StatusCount[];
  recentJobs: RecentJob[];
  followUps: {
    target: string;
    action: string;
    due: string;
  }[];
};
const StageIndicator = ({ status }: { status: string }) => {
  const totalStages = 5; // only progress stages (exclude terminal ones)

  const terminalStatuses = ["Rejected", "Ghosted"];
  const progressStatuses = STATUS_ORDER.slice(0, totalStages);

  const currentStage = terminalStatuses.includes(status)
    ? 0
    : progressStatuses.indexOf(status) + 1;

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStages }).map((_, i) => (
        <div
          key={i}
          className={`h-1 w-4 rounded-full transition-colors duration-300 ${
            i < currentStage
              ? status === "Offer"
                ? "bg-green-500"
                : "bg-zinc-900"
              : "bg-zinc-100"
          }`}
        />
      ))}
    </div>
  );
};

const STATUS_STYLES: Record<string, string> = {
  Applied: "bg-zinc-100 text-zinc-600",

  "HR Call": "bg-indigo-100 text-indigo-600",

  "Interview 1": "bg-blue-100 text-blue-600",
  "Interview 2": "bg-blue-100 text-blue-600",

  Test: "bg-purple-100 text-purple-600",

  Interviewing: "bg-blue-100 text-blue-600",

  Offer: "bg-green-100 text-green-600",

  Rejected: "bg-red-100 text-red-600",

  Ghosted: "bg-zinc-200 text-zinc-500",
};

const StatusBadge = ({ status }: { status: string }) => {
  const style = STATUS_STYLES[status] ?? "bg-zinc-100 text-zinc-600";

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold tracking-wider self-start ${style}`}
    >
      {status.toUpperCase()}
    </span>
  );
};

/* ---------------- API ---------------- */

const fetchDashboard = async (): Promise<DashboardResponse> => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:3001/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* ---------------- Page ---------------- */

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  const [isfollowupModalopen, setisfollowupModalopen] = useState(false);
  const [action, setAction] = useState("");
  const [target, setTarget] = useState("");
  const [due, setDue] = useState("");

  useEffect(() => {
    if (isfollowupModalopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isfollowupModalopen]);

  const handleModal = () => {
    console.log("");
    setisfollowupModalopen(false);
  };
  /* ---------- Derived UI data ---------- */

  const STATUS_DATA = useMemo(() => {
    if (!data) return [];

    const statusMap = Object.fromEntries(
      data.statusBreakdown.map((s) => [s.name, s.total])
    );

    return STATUS_ORDER.filter((status) => statusMap[status] > 0).map(
      (status) => ({
        name: status,
        total: statusMap[status],
      })
    );
  }, [data]);

  const stats = useMemo(() => {
    if (!data) return [];

    return [
      {
        label: "TOTAL APPLICATIONS",
        value: data.stats.totalApplications,
        change: "+4 this week",
      },
      {
        label: "ACTIVE INTERVIEWS",
        value: "6",
        change: "2 Upcoming",
      },
      {
        label: "OFFERS",
        value: "1",
        change: "Negotiation Phase",
      },
      {
        label: "Follow-Ups",
        value: data.stats.followUps,
        change: "Requires actions",
      },
    ];
  }, [data]);

  const recentJobs = useMemo(() => {
    if (!data) return [];
    return data.recentJobs.slice(0, 5);
  }, [data]);

  if (isLoading) return <p className="p-8">Loading dashboard...</p>;
  if (isError) return <p className="p-8">Failed to load dashboard</p>;

  return (
    <div className="min-h-screen bg-zinc-50/50 p-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Overview of your current search trajectory.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm"
          >
            <p className="text-xs text-zinc-500 uppercase font-mono mb-2 tracking-wide">
              {stat.label}
            </p>
            <p className="text-3xl font-bold font-mono text-zinc-900">
              {stat.value}
            </p>
            {stat.change && (
              <p className="text-[11px] text-zinc-400 font-medium">
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-xs font-bold text-zinc-400 uppercase font-mono mb-4">
            Status Breakdown
          </h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATUS_DATA}>
                <CartesianGrid vertical={false} stroke="#f4f4f5" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  interval={0} // show ALL labels
                  angle={-35} // rotate labels
                  textAnchor="end"
                  height={60} // extra space for rotated text
                  tick={{ fontSize: 11 }} // smaller font fits better
                />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="total" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono mb-6">
            Activity (Apps/Week)
          </h4>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={ACTIVITY_DATA}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f4f4f5"
                />
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#a1a1aa" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "6px",
                    border: "1px solid #e4e4e7",
                    fontSize: "12px",
                    padding: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="apps"
                  stroke="#18181b"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#18181b", strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#18181b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono mb-6">
            Response Funnel
          </h4>
          <div className="space-y-4">
            {FUNNEL_STEPS.map((step, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-400 font-medium">
                    {step.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-900 font-bold">
                      {step.value}
                    </span>
                    <span className="text-[10px] text-zinc-400 mono">
                      {step.percentage}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-zinc-50 rounded-full h-1 overflow-hidden border border-zinc-100">
                  <div
                    className="bg-zinc-900 h-full transition-all duration-500"
                    style={{ width: step.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-zinc-400 font-mono tracking-wider text-[11px]">
                  ROLE
                </th>
                <th className="px-6 py-3 text-left font-mono text-zinc-400 tracking-wider text-[11px]">
                  STATUS
                </th>
                <th className="px-6 py-3 text-right font-mono text-zinc-400 tracking-wider text-[11px]">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{job.JobTitle}</p>
                    <p className="text-xs text-zinc-500">{job.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <StatusBadge status={job.status} />
                      <StageIndicator status={job.status} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-zinc-400">
                    {new Date(job.appliedDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-zinc-900">Follow-ups</h3>
            <button className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">
              Calendar
            </button>
          </div>
          <div className="space-y-3">
            {followUps.map((task, i) => (
              <div
                key={i}
                className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-zinc-300 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {task.action}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{task.target}</p>
                  <span className="inline-block mt-2 text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold font-mono">
                    DUE {task.due.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
            <button
              onClick={() => setisfollowupModalopen(true)}
              className="p-4 w-full border border-dashed border-zinc-200 rounded-lg
             flex items-center justify-center text-zinc-400 text-xs
             hover:border-zinc-400 hover:text-zinc-900 transition-all cursor-pointer"
            >
              + Add new reminder
            </button>
          </div>
        </div>
      </div>
      {isfollowupModalopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            onClick={() => setisfollowupModalopen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Modal card */}
          <div className="relative w-full max-w-sm bg-white rounded-lg p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-zinc-900">
              Add reminder
            </h3>

            <div className="mt-4 space-y-3">
              <input
                placeholder="Action (e.g. Send follow-up email)"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />

              <input
                placeholder="Target (e.g. GitHub)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />

              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setisfollowupModalopen(false)}
                className="text-xs text-zinc-500 hover:text-zinc-900"
              >
                Cancel
              </button>
              <button
                onClick={handleModal}
                className="px-3 py-1.5 rounded-md bg-zinc-900 text-white text-xs hover:bg-zinc-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
