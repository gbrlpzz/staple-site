export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateAccess(email: string, inquiry: string): string | null {
  if (!EMAIL_PATTERN.test(email.trim())) return "Enter a valid work email address.";
  if (inquiry.trim().length < 5) {
    return "Please say a little about why you are writing.";
  }
  return null;
}

export function accessEndpoint(): string | null {
  const url = import.meta.env.VITE_ACCESS_ENDPOINT?.trim();
  return url || null;
}

export async function submitAccessRequest(
  email: string,
  inquiry: string,
  fetchImpl: typeof fetch = fetch
): Promise<{ mode: "posted" | "mailto" }> {
  const error = validateAccess(email, inquiry);
  if (error) throw new Error(error);

  const endpoint = accessEndpoint();
  if (endpoint) {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        inquiry: inquiry.trim(),
        source: "staple-site",
      }),
    });
    if (!response.ok) throw new Error("Couldn't reach the server right now. Please try again in a moment.");
    return { mode: "posted" };
  }

  return { mode: "mailto" };
}

export function mailtoHref(email: string, inquiry: string): string {
  const subject = encodeURIComponent("Staple inquire");
  const body = encodeURIComponent(`${inquiry.trim()}\n\n${email.trim()}`);
  return `mailto:info@gabrielepizzi.com?subject=${subject}&body=${body}`;
}
