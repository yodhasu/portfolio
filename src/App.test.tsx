import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import documentShell from "../index.html?raw";
import App from "./App";
import { featuredProjects, profile } from "./content";

describe("document shell", () => {
  it("uses the uploaded artwork as the website icon", () => {
    expect(documentShell).toContain('<link rel="icon" type="image/png" href="/icon.png" />');
    expect(documentShell).toContain('<link rel="apple-touch-icon" href="/icon.png" />');
  });

  it("configures Vercel to serve the SPA for direct route refreshes", () => {
    const configFiles = import.meta.glob("../vercel.json", {
      eager: true,
      import: "default",
      query: "?raw"
    });
    const rawConfig = configFiles["../vercel.json"];

    expect(rawConfig).toEqual(expect.any(String));
    expect(JSON.parse(rawConfig as string)).toEqual({
      rewrites: [{ source: "/(.*)", destination: "/index.html" }]
    });
  });
});

describe("portfolio content", () => {
  it("presents public contact details without exposing the phone number", () => {
    expect(profile.email).toBe("yodha.pratama@gmail.com");
    expect(profile.phone).toBeUndefined();
  });

  it("orders featured projects with ReINE and Pasraman LMS first", () => {
    expect(featuredProjects.map((project) => project.name).slice(0, 2)).toEqual([
      "ReINE",
      "Pasraman LMS"
    ]);
  });
});

describe("portfolio app", () => {
  beforeEach(() => {
    window.history.pushState(null, "", "/");
  });

  it("renders the main workspace portfolio with required sections and actions", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Alethea Agung Yodha Pratama/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /Primary/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Featured Work/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Creative Teaching/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download CV/i })).toHaveAttribute(
      "href",
      "/ATS_Friendly_Technical_Resume-5.pdf"
    );
    expect(screen.queryByText(/\+62-815-958-3273/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/Yodha Workspace/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/DOI: TBA \(In Submission\)/i)).toBeInTheDocument();
  });

  it("shows the ReINE explainer page at the ReINE route", async () => {
    render(<App />);

    // Click link to open ReINE page
    await userEvent.click(screen.getByRole("link", { name: /Explore Explainer/i }));

    expect(
      screen.getByRole("heading", { name: /Residual Information Network Editing/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/frozen/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/MicroAdapter/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Anchor /i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Yodha Workspace \/\/ Personal Lab Note 01/i)).toBeInTheDocument();
    expect(screen.getByText(/ReINE — Research Explainer/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /ReINE Sketch/i })).toHaveAttribute(
      "src",
      "/reine_sketch.jpg"
    );
    const artworkLink = screen.getByRole("link", { name: /Original artwork post/i });
    expect(artworkLink).toHaveAttribute(
      "href",
      "https://x.com/Yodha_syu/status/1684221652337561606?s=20"
    );
    expect(artworkLink).toHaveAttribute("target", "_blank");
    expect(screen.getByText(/Drawn by Yodha \(Yodha_syu\)/i)).toBeInTheDocument();
    expect(screen.queryByText(/CODENAME MOTIF \/ hand-drawn ReINE sketch/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/visual codename motif/i)).not.toBeInTheDocument();
    expect(screen.getByText(/A tribute to my oshi — and her art of “halu”\./i)).toBeInTheDocument();
    expect(screen.getByText(/The adapter was small\./i)).toBeInTheDocument();
    expect(screen.getByText(/In this tested setup, shallow lower-layer intervention produced stronger identity binding/i)).toBeInTheDocument();
    expect(screen.getByText(/STATUS: In Submission \(Preprint Draft\) \/\/ DOI: TBA/i)).toBeInTheDocument();
  });

  it("opens the mobile navigation menu from the menu button", async () => {
    render(<App />);

    expect(screen.queryByRole("navigation", { name: /Mobile/i })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Open menu/i }));

    const mobileNav = screen.getByRole("navigation", { name: /Mobile/i });
    expect(mobileNav).toBeInTheDocument();
    expect(within(mobileNav).getByRole("link", { name: /Skills/i })).toBeInTheDocument();
  });
});
