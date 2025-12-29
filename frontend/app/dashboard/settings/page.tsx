import React from "react";

const SettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-12 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage your account preferences and workspace configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Settings Sidebar */}
        <nav className="space-y-1 col-span-1">
          <SettingsNavItem label="General" active />
          <SettingsNavItem label="Security" />
          <SettingsNavItem label="Notifications" />
          <SettingsNavItem label="Workspace" />
          <SettingsNavItem label="Billing" />
        </nav>

        {/* Settings Content */}
        <div className="col-span-1 md:col-span-3 space-y-10">
          {/* Profile Section */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
              Public Profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <button className="text-xs font-semibold text-zinc-900 border border-zinc-200 px-3 py-1.5 rounded hover:bg-zinc-50 transition-colors">
                  Change avatar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">
                    Display name
                  </label>
                  <input
                    type="text"
                    defaultValue="John S."
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue="Senior Frontend Engineer"
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Actively exploring new opportunities in the fintech space."
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-zinc-100" />

          {/* Preferences Section */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mono">
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    Email Notifications
                  </p>
                  <p className="text-xs text-zinc-500">
                    Receive weekly summaries and interview reminders.
                  </p>
                </div>
                <Toggle active />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    Public Profile
                  </p>
                  <p className="text-xs text-zinc-500">
                    Allow recruiters to view your shared application board.
                  </p>
                </div>
                <Toggle />
              </div>
            </div>
          </section>

          <div className="h-px bg-zinc-100" />

          {/* Dangerous Zone */}
          <section className="space-y-6 pt-4">
            <div className="p-4 border border-red-100 bg-red-50/30 rounded-lg">
              <h4 className="text-sm font-semibold text-red-900 mb-1">
                Delete Account
              </h4>
              <p className="text-xs text-red-700/70 mb-4 leading-relaxed">
                Permanently remove all your application data and account
                information. This action cannot be undone.
              </p>
              <button className="text-xs font-bold text-red-600 bg-white border border-red-200 px-4 py-2 rounded hover:bg-red-50 transition-colors">
                Delete everything
              </button>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4">
            <button className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
              Reset
            </button>
            <button className="bg-zinc-900 text-white text-xs font-bold px-6 py-2 rounded-md hover:bg-zinc-800 transition-all shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsNavItem = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <button
    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? "bg-zinc-100 text-zinc-900"
        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50/50"
    }`}
  >
    {label}
  </button>
);

const Toggle = ({ active = false }: { active?: boolean }) => (
  <button
    className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${
      active ? "bg-zinc-900" : "bg-zinc-200"
    }`}
  >
    <div
      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${
        active ? "left-6" : "left-1"
      }`}
    />
  </button>
);

export default SettingsView;
