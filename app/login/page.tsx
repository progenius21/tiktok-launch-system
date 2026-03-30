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
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <nav aria-label="Main navigation">
        <a className="nav-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </a>
        <a className="nav-cta" href="/" style={{ textDecoration: "none" }}>
          Back to Home <span aria-hidden="true">→</span>
        </a>
      </nav>

      <main id="main-content">
        <section className="login-section">
          <div className="section-tag" aria-hidden="true">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </div>
          <h1 className="section-title">
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
          </h1>

          <form className="login-form" onSubmit={handleSubmit} aria-label={mode === "login" ? "Sign in" : "Create account"}>
            <div className="login-field">
              <label className="login-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="dash-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>
            <div className="login-field">
              <label className="login-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                className="dash-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>

            <button
              className="btn-primary"
              type="submit"
              disabled={loading}
              aria-busy={loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading
                ? "Loading..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>

            {error && (
              <p id="login-error" className="login-error" role="alert" aria-live="assertive">
                {error}
              </p>
            )}
            {message && (
              <p className="login-message" role="status" aria-live="polite">
                {message}
              </p>
            )}

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
      </main>

      <footer role="contentinfo">
        <a className="footer-logo" href="/" aria-label="TikTok Launch System — Home">
          TIKTOK<span aria-hidden="true">.</span>LAUNCH
        </a>
        <span className="footer-copy">© 2026 · All rights reserved</span>
      </footer>
    </>
  );
}
