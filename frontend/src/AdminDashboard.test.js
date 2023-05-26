import { render, screen } from "@testing-library/react";


import AdminDashboard from "./pages/AdminDashboard";

  

describe("Admin", () => {

  it("should have exact heading in login form", () => {

    /* Rendering the App component. */

    render(<AdminDashboard />);


    /* Getting the element with the test id of "app-header-heading". */

    const mainHeading = screen.getByTestId("dashboard-login-heading");


    /* Checking that the innerHTML of the element with the test id of "app-header-heading" is equal to

    "Productivity Tracker". */

    expect(mainHeading.innerHTML).toBe("Sign in");

  });

  it("should have exact text in login form", () => {

    /* Rendering the App component. */

    render(<AdminDashboard />);


    /* Getting the element with the test id of "app-header-heading". */

    const mainHeading = screen.getByTestId("admin-login-frogot-password");


    /* Checking that the innerHTML of the element with the test id of "app-header-heading" is equal to

    "Productivity Tracker". */

    expect(mainHeading.innerHTML).toBe("Forgot password?");

  });

}); 
