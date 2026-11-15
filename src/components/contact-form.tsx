"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error" | "not_configured";

const field =
  "mt-1.5 w-full rounded-md border border-line bg-surface px-3 py-2 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setState("sent");
      } else if (res.status === 503) {
        setState("not_configured");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-accent bg-accent-soft/40 p-6"
      >
        <p className="font-semibold">Message sent.</p>
        <p className="mt-1 text-sm text-muted">
          Thank you. I will reply to the email address you gave.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={field}
        />
      </div>

      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="alert" className="text-sm text-warn">
          {state === "error" &&
            "The message could not be sent. Check the fields and try again."}
          {state === "not_configured" &&
            "The form is not connected to email yet. Please use one of the links on this page."}
        </p>
      </div>
    </form>
  );
}
