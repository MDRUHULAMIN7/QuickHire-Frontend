"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type LoginValues = { id: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: LoginValues) => {
    try {
      setLoading(true);
      const res = await login(values);
      localStorage.setItem("qh_access_token", res.data.accessToken);
      toast.success("Logged in successfully");
      router.push("/admin");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center  ">

        {/* ── Left: copy ── */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            Secure access
          </span>
          <h1 className="mt-5 font-brand text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[40px] lg:leading-tight">
            Welcome back to QuickHire
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600 max-w-sm mx-auto lg:mx-0">
            Sign in to manage hiring pipelines, review applicants, and keep
            teams aligned. Your session stays protected with encrypted access.
          </p>
        </div>

        {/* ── Right: form card ── */}
        <div className="w-full max-w-lg shrink-0 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
          <h2 className="text-lg font-semibold text-slate-900">Sign in</h2>
          <p className="mt-1 text-sm text-slate-500">
            Use your credentials to continue.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                User ID
              </label>
              <input
                {...register("id", { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900/40 focus:ring-2 focus:ring-slate-900/10"
                placeholder="ID-0001"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900/40 focus:ring-2 focus:ring-slate-900/10"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-indigo-400 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Continue"}
            </button>
          </form>

          <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-xs text-indigo-500">
            Need access? Contact your admin or support team.
          </div>
        </div>

      </div>
    </section>
  );
}