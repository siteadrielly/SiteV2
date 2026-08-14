"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-line p-10">
        <div className="text-center mb-8">
          <p className="font-display text-ivory tracking-[0.14em] uppercase text-sm mb-1">Adriely <span className="text-gold">Anute</span></p>
          <p className="text-gold text-[0.65rem] tracking-[0.28em] uppercase mt-3">Painel Vital</p>
        </div>
        <div className="mb-5">
          <label className="block text-gold text-[0.68rem] tracking-[0.18em] uppercase mb-2">E-mail</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-line text-ivory py-2 text-sm focus:border-gold outline-none" />
        </div>
        <div className="mb-6">
          <label className="block text-gold text-[0.68rem] tracking-[0.18em] uppercase mb-2">Senha</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-line text-ivory py-2 text-sm focus:border-gold outline-none" />
        </div>
        {error && <p className="text-[#D79A8C] text-sm mb-4" role="alert">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-gold text-black text-xs tracking-[0.16em] uppercase py-3 hover:bg-gold-light transition disabled:opacity-50">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
