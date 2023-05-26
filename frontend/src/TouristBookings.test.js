import { render, screen } from "@testing-library/react";

import TouristBookings from "./Admin_Components/TouristBookings";

describe("Admin Tourist booking view", () => {
  
    it("should throw error when not wrapped inside `UserContext not found`", () => {
  
      expect(() => render(<TouristBookings />))
        .toThrow("UserContext not found");
  
      });
  
  });