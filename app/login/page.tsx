"use client";

import { useState, FormEvent } from "react";
import { createBrowserClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const supabase = createBrowserClient();

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage("Check your email for a confirmation link.");
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
      } else {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect") || "/dashboard";
        window.location.href = redirect;
      }
    }

    setLoading(false);
  }

  return (
    <>
      <nav>
        <a className="nav-logo" href="/">
          TIKTOK<span>.</span>LAUNCH
        </a>
        <a className="nav-cta" href="/" style={{ textDecoration: "none" }}>
          Back to Home →
        </a>
      </nav>

      <section className="login-section">
        <div className="section-tag">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </div>
        <div className="section-title">
          {mode === "login" ? (
            <>
              SIGN IN TO
              <br />
              YOUR DASHBOARD.
            </>
          ) : (
            <>
              JOIN THE
              <br />
              LAUNCH SYSTEM.
            </>
          )}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              className="dash-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              className="dash-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading
              ? "Loading..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>

          {error && <p className="login-error">{error}</p>}
          {message && <p className="login-message">{message}</p>}

          <button
            type="button"
            className="login-toggle"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setMessage("");
            }}
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </section>

      <footer>
        <a className="footer-logo" href="/">
          TIKTOK<span>.</span>LAUNCH
        </a>
        <span className="footer-copy">© 2026 · All rights reserved</span>
      </footer>
    </>
  );
}
