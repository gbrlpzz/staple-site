import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccessForm } from "../src/components/AccessForm";
import { submitAccessRequest, validateAccess } from "../src/lib/access";

describe("access validation", () => {
  it("rejects invalid email and a too-short inquiry", () => {
    expect(validateAccess("not-an-email", "hello there")).toMatch(/valid work email/i);
    expect(validateAccess("a@b.co", "hi")).toMatch(/why you are writing/i);
    expect(validateAccess("a@b.co", "Retail data discussion")).toBeNull();
  });
});

describe("access form", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not submit invalid email", async () => {
    const user = userEvent.setup();
    render(<AccessForm />);
    await user.type(screen.getByLabelText(/work email/i), "nope");
    await user.type(screen.getByLabelText(/why you are writing/i), "Evaluating the food system.");
    await user.click(screen.getByRole("button", { name: "Inquire" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/valid work email/i);
    expect(screen.queryByText(/Inquiry received/)).toBeNull();
  });

  it("posts once and shows received when an endpoint is configured", async () => {
    vi.stubEnv("VITE_ACCESS_ENDPOINT", "https://example.test/access");
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true });
    const result = await submitAccessRequest("lead@retailer.ch", "Evaluating retail integration.", fetchImpl);
    expect(result.mode).toBe("posted");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [, init] = fetchImpl.mock.calls[0];
    expect(JSON.parse(String(init.body)).email).toBe("lead@retailer.ch");

    vi.stubGlobal("fetch", fetchImpl);
    const user = userEvent.setup();
    render(<AccessForm />);
    await user.type(screen.getByLabelText(/work email/i), "lead@retailer.ch");
    await user.type(screen.getByLabelText(/why you are writing/i), "Evaluating retail integration.");
    await user.click(screen.getByRole("button", { name: "Inquire" }));
    expect(await screen.findByText(/Inquiry received/)).toBeInTheDocument();
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});
