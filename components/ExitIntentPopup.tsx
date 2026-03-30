"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const close = useCallback(() => setVisible(false), []);

  useEffect(() => {
    // Don't show on touch devices
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      return;
    }

    // Don't show if already shown this session
    if (sessionStorage.getItem("exitPopupShown")) {
      return;
    }

    let listenerActive = false;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return;
      if (sessionStorage.getItem("exitPopupShown")) return;
      sessionStorage.setItem("exitPopupShown", "true");
      setVisible(true);
      document.removeEventListener("mouseleave", handleMouseLeave);
    }

    // 3-second delay before activating
    const timer = setTimeout(() => {
      listenerActive = true;
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (listenerActive) {
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setVisible(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setVisible(false), 2000);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="exit-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Get the free warm-up checklist"
    >
      <div className="exit-popup">
        <button
          type="button"
          className="exit-close"
          onClick={close}
          aria-label="Close popup"
        >
          ✕
        </button>

        <h2 className="exit-headline">
          WAIT. TAKE THIS FIRST.
        </h2>
        <p className="exit-subtext">
          The exact Day 1–3 TikTok account warm-up protocol. Free. Sent instantly.
        </p>

        {success ? (
          <div className="exit-success" role="status" aria-live="polite">
            Check your inbox ✓
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="exit-form" aria-label="Get the checklist">
            <label htmlFor="exit-email" className="sr-only">Email address</label>
            <input
              id="exit-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="exit-input"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={loading}
              className="exit-submit"
              aria-busy={loading}
            >
              {loading ? "Sending..." : "SEND ME THE CHECKLIST →"}
            </button>
            {error && (
              <p className="exit-error" role="alert" aria-live="assertive">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
