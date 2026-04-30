"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  title: string;
  country: string;
  jobType: string;
  salaryEUR: number;
  duration: string;
  sector: string;
  requirements: string[];
  description: string;
  featured?: boolean;
};

type Application = {
  _id: string;
  type: string;
  fullName?: string;
  passportNumber?: string;
  phone?: string;
  email?: string;
  preferredCountry?: string;
  jobId?: string;
  cvFilename?: string;
  name?: string;
  subject?: string;
  message?: string;
  status?: string;
  createdAt: string;
};

const blankJob: Job = {
  id: "",
  title: "",
  country: "Turkey",
  jobType: "Full-time",
  salaryEUR: 700,
  duration: "",
  sector: "",
  requirements: [],
  description: "",
  featured: false
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [editing, setEditing] = useState<Job | null>(null);
  const [reqsText, setReqsText] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth gate
  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => {
        if (!r.ok) router.replace("/admin/login");
        else setAuthChecked(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function loadAll() {
    setLoading(true);
    const [j, a] = await Promise.all([
      fetch("/api/jobs").then((r) => r.json()).catch(() => ({ jobs: [] })),
      fetch("/api/applications").then((r) => r.json()).catch(() => ({ applications: [] }))
    ]);
    setJobs(j.jobs || []);
    setApps(a.applications || []);
    setLoading(false);
  }

  useEffect(() => {
    if (authChecked) loadAll();
  }, [authChecked]);

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
  }

  async function saveJob() {
    if (!editing) return;
    const payload = { ...editing, requirements: reqsText.split("\n").map((s) => s.trim()).filter(Boolean) };
    const isNew = !jobs.some((j) => j.id === editing.id);
    const url = isNew ? "/api/jobs" : `/api/jobs/${encodeURIComponent(editing.id)}`;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert("Failed: " + (err?.error || res.statusText));
      return;
    }
    setEditing(null);
    setReqsText("");
    loadAll();
  }

  async function deleteJob(id: string) {
    if (!confirm(`Delete job "${id}"?`)) return;
    const res = await fetch(`/api/jobs/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert("Failed: " + (err?.error || res.statusText));
      return;
    }
    loadAll();
  }

  function newJob() {
    const j = { ...blankJob, id: `job-${Date.now()}` };
    setEditing(j);
    setReqsText("");
  }

  function editJob(j: Job) {
    setEditing({ ...j });
    setReqsText((j.requirements || []).join("\n"));
  }

  if (!authChecked) {
    return <div className="container-px py-20 text-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl container-px py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Manage jobs and view applications</p>
        </div>
        <button onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">
          Logout
        </button>
      </div>

      <div className="mt-8 flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setTab("jobs")}
          className={`px-4 py-2.5 text-sm font-semibold transition ${
            tab === "jobs" ? "border-b-2 border-brand-700 text-brand-700" : "text-slate-600"
          }`}
        >
          Jobs ({jobs.length})
        </button>
        <button
          onClick={() => setTab("applications")}
          className={`px-4 py-2.5 text-sm font-semibold transition ${
            tab === "applications" ? "border-b-2 border-brand-700 text-brand-700" : "text-slate-600"
          }`}
        >
          Applications ({apps.length})
        </button>
      </div>

      {loading && <div className="py-10 text-center text-slate-500">Loading...</div>}

      {/* Jobs tab */}
      {!loading && tab === "jobs" && (
        <div className="mt-6">
          <button onClick={newJob} className="btn-primary !py-2.5">
            + New Job
          </button>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700">ID</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Country</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Salary</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{j.id}</td>
                    <td className="px-4 py-3 font-medium">{j.title}</td>
                    <td className="px-4 py-3">{j.country}</td>
                    <td className="px-4 py-3">{j.jobType}</td>
                    <td className="px-4 py-3">€{j.salaryEUR}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => editJob(j)} className="text-brand-700 hover:underline mr-3">
                        Edit
                      </button>
                      <button onClick={() => deleteJob(j.id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                      No jobs yet. Click "New Job" to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Edit modal */}
          {editing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
              <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl my-8">
                <h2 className="text-xl font-bold">{jobs.some((j) => j.id === editing.id) ? "Edit job" : "New job"}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="label">Job ID (slug)</label>
                    <input
                      className="input"
                      value={editing.id}
                      onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Title</label>
                    <input
                      className="input"
                      value={editing.title}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Country</label>
                    <select
                      className="input"
                      value={editing.country}
                      onChange={(e) => setEditing({ ...editing, country: e.target.value })}
                    >
                      <option>Turkey</option>
                      <option>Romania</option>
                      <option>Austria</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Type</label>
                    <select
                      className="input"
                      value={editing.jobType}
                      onChange={(e) => setEditing({ ...editing, jobType: e.target.value })}
                    >
                      <option>Full-time</option>
                      <option>Seasonal</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Salary EUR/mo</label>
                    <input
                      type="number"
                      className="input"
                      value={editing.salaryEUR}
                      onChange={(e) => setEditing({ ...editing, salaryEUR: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="label">Duration</label>
                    <input
                      className="input"
                      value={editing.duration}
                      onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                      placeholder="e.g. 2 years"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Sector</label>
                    <input
                      className="input"
                      value={editing.sector}
                      onChange={(e) => setEditing({ ...editing, sector: e.target.value })}
                      placeholder="Factory, Hospitality, Construction, Agriculture..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Requirements (one per line)</label>
                    <textarea
                      className="input"
                      rows={4}
                      value={reqsText}
                      onChange={(e) => setReqsText(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Description</label>
                    <textarea
                      className="input"
                      rows={4}
                      value={editing.description}
                      onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    />
                  </div>
                  <label className="flex items-center gap-2 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={!!editing.featured}
                      onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    />
                    <span className="text-sm">Featured on homepage</span>
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => { setEditing(null); setReqsText(""); }}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button onClick={saveJob} className="btn-primary !py-2.5">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Applications tab */}
      {!loading && tab === "applications" && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Contact</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Country</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Job / Subject</th>
                <th className="px-4 py-3 font-semibold text-slate-700">CV / Msg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {apps.map((a) => (
                <tr key={a._id} className="hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      a.type === "application" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                    }`}>
                      {a.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{a.fullName || a.name}</td>
                  <td className="px-4 py-3 text-xs">
                    {a.phone && <div>{a.phone}</div>}
                    {a.email && <div className="text-slate-500">{a.email}</div>}
                  </td>
                  <td className="px-4 py-3">{a.preferredCountry || "—"}</td>
                  <td className="px-4 py-3 text-xs">{a.jobId || a.subject || "—"}</td>
                  <td className="px-4 py-3 text-xs max-w-xs">
                    {a.cvFilename && (
                      <a href={a.cvFilename} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                        View CV
                      </a>
                    )}
                    {a.message && <div className="text-slate-700">{a.message}</div>}
                  </td>
                </tr>
              ))}
              {apps.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-500">No applications yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
