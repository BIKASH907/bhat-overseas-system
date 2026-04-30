"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md container-px py-20">
      <h1 className="heading-2 text-center">Admin Login</h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Use the credentials configured in your .env file
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
            placeholder="admin@bhatoverseas.com"
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        {err && <div className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
