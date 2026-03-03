"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/components/providers/AuthProvider";
import { updateMe } from "@/lib/api/user";
import { toast } from "react-hot-toast";

type ProfileValues = {
  name: string;
  avatarUrl: string;
};

export default function AdminSettingsPage() {
  const { user, setUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, setValue } = useForm<ProfileValues>({
    defaultValues: {
      name: "",
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (!user) return;
    setValue("name", user.name ?? "");
    setValue("avatarUrl", user.avatarUrl ?? "");
  }, [user, setValue]);

  const onSubmit = async (values: ProfileValues) => {
    const payload = {
      name: values.name.trim() || undefined,
      avatarUrl: values.avatarUrl.trim() || undefined,
    };
    if (!payload.name && !payload.avatarUrl) {
      toast.error("Provide name or avatar URL");
      return;
    }
    try {
      setSaving(true);
      const res = await updateMe(payload);
      setUser(res.data);
      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Update your profile details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">
              Full name
            </label>
            <input
              {...register("name")}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900/40 focus:ring-2 focus:ring-slate-900/10"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">
              Avatar URL
            </label>
            <input
              {...register("avatarUrl")}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900/40 focus:ring-2 focus:ring-slate-900/10"
              placeholder="https://..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </section>
  );
}
