import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock IntersectionObserver as a constructable class for JSDOM
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// Mock scrollTo and scrollIntoView
vi.stubGlobal("scrollTo", vi.fn());
window.HTMLElement.prototype.scrollIntoView = vi.fn();
