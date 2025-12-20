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

/* Static Data */

const STATUS_DATA = [
  { name: "Applied", total: 12 },
  { name: "Interview", total: 6 },
  { name: "Rejected", total: 9 },
  { name: "Offer", total: 1 },
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

const initialJobs = [
  {
    role: "Senior Frontend Engineer",
    company: "Linear",
    status: "Interviewing",
    appliedDate: "Mar 12, 2024",
  },
  {
    role: "Fullstack Developer",
    company: "Vercel",
    status: "Applied",
    appliedDate: "Mar 11, 2024",
  },
  {
    role: "Product Engineer",
    company: "Raycast",
    status: "Rejected",
    appliedDate: "Mar 08, 2024",
  },
];

export default function DashboardPage() {
  const stats = [
    { label: "Total Applications", value: "28", change: "+4 this week" },
    { label: "Active Interviews", value: "6", change: "2 upcoming" },
    { label: "Offers", value: "1", change: "Negotiation phase" },
    { label: "Follow-ups", value: "4", change: "Requires action" },
  ];

  const recentJobs = useMemo(() => {
    return initialJobs.slice(0, 5);
  }, []);

  const followUps = [
    { target: "GitHub", action: "Send thank you note", due: "Today" },
    { target: "Stripe", action: "Check application status", due: "Tomorrow" },
  ];

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
            <p className="text-[11px] text-zinc-400">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Chart */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-xs font-bold text-zinc-400 uppercase mono mb-4">
            Status Breakdown
          </h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATUS_DATA}>
                <CartesianGrid vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="total" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-xs font-bold text-zinc-400 uppercase mono mb-4">
            Weekly Activity
          </h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ACTIVITY_DATA}>
                <CartesianGrid vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line dataKey="apps" stroke="#18181b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-xs font-bold text-zinc-400 uppercase mono mb-4">
            Response Funnel
          </h4>
          <div className="space-y-3">
            {FUNNEL_STEPS.map((step) => (
              <div key={step.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{step.label}</span>
                  <span className="font-bold">{step.value}</span>
                </div>
                <div className="h-1 bg-zinc-100 rounded">
                  <div
                    className="h-full bg-zinc-900 rounded"
                    style={{ width: step.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Jobs + Followups */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border rounded-lg overflow-hidden">
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
                    <p className="font-semibold">{job.role}</p>
                    <p className="text-xs text-zinc-500">{job.company}</p>
                  </td>
                  <td className="px-6 py-4">{job.status}</td>
                  <td className="px-6 py-4 text-right text-xs text-zinc-400">
                    {job.appliedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          {followUps.map((task, i) => (
            <div key={i} className="bg-white border rounded-lg p-4 shadow-sm">
              <p className="font-semibold">{task.action}</p>
              <p className="text-xs text-zinc-500">{task.target}</p>
              <span className="text-[10px] text-zinc-400">DUE {task.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
