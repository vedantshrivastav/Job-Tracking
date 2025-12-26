"use client";

import React, { useMemo } from "react";
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
        label: "Total Applications",
        value: data.stats.totalApplications,
        change: "",
      },
      {
        label: "Follow-ups",
        value: data.stats.followUps,
        change: "Requires action",
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
            <p className="text-xs font-medium text-zinc-500 uppercase mono mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
            {stat.change && (
              <p className="text-[11px] text-zinc-400">{stat.change}</p>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-xs font-bold text-zinc-400 uppercase mono mb-4">
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
      </div>

      {/* Recent Jobs */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map((job, i) => (
              <tr key={i} className="border-t">
                <td className="px-6 py-4">
                  <p className="font-semibold">{job.JobTitle}</p>
                  <p className="text-xs text-zinc-500">{job.company}</p>
                </td>
                <td className="px-6 py-4">{job.status}</td>
                <td className="px-6 py-4 text-right text-xs text-zinc-400">
                  {new Date(job.appliedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
