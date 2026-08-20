import { FormEvent, useEffect, useState } from "react";
import { mailtoHref, submitAccessRequest, validateAccess } from "../lib/access";

export function AccessForm({ initialEmail = "" }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [inquiry, setInquiry] = useState("");
  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const problem = validateAccess(email, inquiry);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSending(true);
    try {
      const result = await submitAccessRequest(email, inquiry);
      if (result.mode === "mailto") {
        window.location.href = mailtoHref(email, inquiry);
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send the request.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="form-success" role="status">
        <h3>Inquiry received.</h3>
        <p>
          A note will go to <strong>{email.trim()}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form className="access-form" onSubmit={(event) => void onSubmit(event)} noValidate>
      <label className="field">
        <span>Work email</span>
        <input
          className="field-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          required
          maxLength={320}
          placeholder="you@organisation.ch"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "access-form-error" : undefined}
        />
      </label>
      <label className="field">
        <span>Why you are writing</span>
        <textarea
          className="field-input field-textarea"
          value={inquiry}
          onChange={(event) => setInquiry(event.target.value)}
          required
          rows={4}
          maxLength={4000}
          placeholder="Retail, research, licensing, or a question about the system."
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "access-form-error" : undefined}
        />
      </label>
      {error && (
        <p className="form-error" id="access-form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button button-primary" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Inquire"}
      </button>
    </form>
  );
}
