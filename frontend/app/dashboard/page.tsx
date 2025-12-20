"use client";
import React, { useState, useMemo } from "react";
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

// Analytics Data moved outside to ensure stability
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

interface DashboardViewProps {
  onExitApp: () => void;
}

type TabType = "dashboard" | "jobs" | "followups" | "analytics" | "settings";

const DashboardView: React.FC<DashboardViewProps> = ({ onExitApp }) => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const stats = [
    { label: "Total Applications", value: "28", change: "+4 this week" },
    { label: "Active Interviews", value: "6", change: "2 upcoming" },
    { label: "Offers", value: "1", change: "Negotiation phase" },
    { label: "Follow-ups", value: "4", change: "Requires action" },
  ];

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

  // Fix: Defined 'recentJobs' based on initialJobs to resolve "Cannot find name 'recentJobs'" error in renderDashboard
  const recentJobs = useMemo(() => {
    return initialJobs.slice(0, 5).map((job) => ({
      role: job.role,
      company: job.company,
      status: job.status,
      date: job.appliedDate,
    }));
  }, [initialJobs]);

  const followUps = [
    { target: "GitHub", action: "Send thank you note", due: "Today" },
    { target: "Stripe", action: "Check application status", due: "Tomorrow" },
  ];

  const renderDashboard = () => (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Overview of your current search trajectory.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm"
          >
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mono mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-zinc-900 mb-1">
              {stat.value}
            </p>
            <p className="text-[11px] text-zinc-400 font-medium">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Analytics Extension */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-zinc-900">Search Analytics</h3>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mono">
            Beta Metrics
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Breakdown Chart */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mono mb-6">
              Status Breakdown
            </h4>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={STATUS_DATA}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f4f4f5"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#a1a1aa" }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "#f4f4f5" }}
                    contentStyle={{
                      borderRadius: "6px",
                      border: "1px solid #e4e4e7",
                      fontSize: "12px",
                      padding: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#18181b"
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Timeline Chart */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mono mb-6">
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

          {/* Response Funnel */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mono mb-6">
              Response Funnel
            </h4>
            <div className="space-y-4">
              {FUNNEL_STEPS.map((step, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 font-medium">
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
      </div>

      {/* Middle Section: Jobs & Follow-ups */}
      <div className="grid lg:grid-cols-3 gap-8 pb-12">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-zinc-900">Recent Applications</h3>
            <button
              onClick={() => setActiveTab("jobs")}
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <th className="px-6 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                    Role & Company
                  </th>
                  <th className="px-6 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
                    Status
                  </th>
                  <th className="px-6 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono text-right">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentJobs.map((job, i) => (
                  <tr
                    key={i}
                    className="hover:bg-zinc-50/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-zinc-900">{job.role}</p>
                      <p className="text-xs text-zinc-500">{job.company}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs text-zinc-400 mono">
                        {job.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow ups */}
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
                  <span className="inline-block mt-2 text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold mono">
                    DUE {task.due.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
            <div className="p-4 border border-dashed border-zinc-200 rounded-lg flex items-center justify-center text-zinc-400 text-xs hover:border-zinc-400 hover:text-zinc-900 cursor-pointer transition-all">
              + Add new reminder
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
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
                    <StatusBadge status={job.status} />
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
                      <MoreIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t border-zinc-100 bg-zinc-50/30 flex items-center justify-center">
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

  return (
    <div className="flex h-screen bg-zinc-50/50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white hidden md:flex flex-col">
        <div className="p-6">
          <div
            className="flex items-center gap-2 mb-8 cursor-pointer"
            onClick={() => setActiveTab("dashboard")}
          >
            <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-semibold tracking-tight text-zinc-900">
              Applied
            </span>
          </div>

          <nav className="space-y-1">
            <NavItem
              icon={<DashboardIcon />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <NavItem
              icon={<JobsIcon />}
              label="Jobs"
              active={activeTab === "jobs"}
              onClick={() => setActiveTab("jobs")}
            />
            <NavItem
              icon={<FollowUpIcon />}
              label="Follow-ups"
              active={activeTab === "followups"}
              onClick={() => setActiveTab("followups")}
            />
            <NavItem
              icon={<AnalyticsIcon />}
              label="Analytics"
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            />
            <NavItem
              icon={<SettingsIcon />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-zinc-100">
          <button
            onClick={onExitApp}
            className="flex items-center gap-3 text-sm text-zinc-500 hover:text-zinc-900 w-full transition-colors"
          >
            <ExitIcon />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div
              className="md:hidden w-6 h-6 bg-zinc-900 rounded"
              onClick={() => setActiveTab("dashboard")}
            ></div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mono">
              <span>/ workspace</span>
              <span>/ {activeTab}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-zinc-900">
              <SearchIcon />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 cursor-pointer overflow-hidden hover:opacity-80 transition-opacity">
              <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                JS
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" ? (
            renderDashboard()
          ) : activeTab === "jobs" ? (
            renderJobs()
          ) : (
            <div className="py-20 text-center text-zinc-400 text-sm mono">
              Coming soon...
            </div>
          )}
        </main>
      </div>

      {/* Add Job Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mono">
                Track New Job
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 p-1"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mono">
                  Role & Company
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="e.g. Frontend Engineer"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Linear"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mono">
                  Initial Status
                </label>
                <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm text-zinc-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all">
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mono">
                  Link / URL
                </label>
                <input
                  type="url"
                  placeholder="https://jobs.company.com/role..."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mono">
                  Internal Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Add keywords, referral info, or salary range..."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 transition-all resize-none"
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2 bg-zinc-900 text-white text-xs font-bold rounded-md hover:bg-zinc-800 transition-all shadow-sm"
              >
                Create Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Sub-components */

const NavItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? "bg-zinc-100 text-zinc-900"
        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

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

/* Icons */

const DashboardIcon = () => (
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
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    ></path>
  </svg>
);

const JobsIcon = () => (
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
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);

const FollowUpIcon = () => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const AnalyticsIcon = () => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ></path>
  </svg>
);

const SettingsIcon = () => (
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
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
  </svg>
);

const ExitIcon = () => (
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
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    ></path>
  </svg>
);

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

export default DashboardView;
