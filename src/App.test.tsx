import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { featuredProjects, profile } from "./content";

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

  it("renders the main studio portfolio with required sections and actions", () => {
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
  });

  it("shows the ReINE explainer page at the ReINE route", async () => {
    render(<App />);

    // Click link to open ReINE page
    await userEvent.click(screen.getByRole("link", { name: /Explore Explainer/i }));

    // Verify ReinePage elements
    expect(
      screen.getByRole("heading", { name: /Residual Information Network Editing/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/frozen host model/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/MicroAdapter Architecture/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Anchor /i)[0]).toBeInTheDocument();
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
