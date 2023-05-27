import { render, screen } from "@testing-library/react";

import GuideAndHotelMng from "./Admin_Components/GuideAndHotelMng";

describe("Admin Guide and Hotel Manage", () => {
  
    it("should throw error when not wrapped inside `UserContext not found`", () => {
  
      expect(() => render(<GuideAndHotelMng />))
        .toThrow("UserContext not found");
  
      });
  
  });