import { render, screen,fireEvent  } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import AdminDashboard from "./pages/AdminDashboard";
import LoginForm from "./pages/AdminDashboard";
import { signupFormErrorMessages, signupValidationSchema } from './SigninVaidation';
import "@testing-library/jest-dom/extend-expect"

require("dotenv").config();

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

describe('signupValidationSchema', () => {

  it('should not give an error if all the inputs are valid', async () => {
    const validFullInput = {
      username: 'sahan',
      password: '123',
    };
    const validationResult = await signupValidationSchema.validate(validFullInput).catch(err => err);

    expect(validationResult).toBe(validFullInput);
    expect(validationResult.errors).toBe(undefined);
  });

  it('should give an error if the name field is empty', async () => {
    const nameInput = '';
    const validationResult = await signupValidationSchema.validateAt('username', { username: nameInput }).catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:required']);
  });


  it(`should give an error if the name input has less than ${3} characters`, async () => {
    const nameInput = 'J'.repeat(3 - 1);
    const validationResult = await signupValidationSchema.validateAt('username', { username: nameInput }).catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:min']);
  });

  it(`should give an error if the name input has more than ${25} characters`, async () => {
    const nameInput = 'a'.repeat(26 + 1);
    const validationResult = await signupValidationSchema.validateAt('username', { username: nameInput }).catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:max']);
  });



});

describe('LoginForm', () => {
  
  test('allows admin input in the username field', () => {
    render(<LoginForm />);
    
    const usernameInput = screen.getByTestId('admin-user-name');
    userEvent.type(usernameInput, 'testuser');
    expect(process.env.usernameInput).toBe("testuser")

      });
  
  test('allows admin input in the password field', () => {
    render(<AdminDashboard />);
    
    const passwordInput = screen.getByTestId('admin-password');
    userEvent.type(passwordInput, 'testpassword');
    
    expect(process.env.passwordInput).toBe('testpassword');
  });
  
});

// describe('Admin Signin Screen', () => {
//   const testID = 'admin-dashboard';
//   const getRenderedScreen = () => renderWithProviders(<AdminDashboard />);

//   it(`should render SignupScreen correctly`, () => {
//     const renderer = getRenderedScreen();
//     const renderTree = renderer.toJSON();
//     expect(renderTree).toMatchSnapshot();
//   });

//   it('should find the SignupScreen via testID', () => {
//     const { getByTestId } = getRenderedScreen();
//     const foundScreen = getByTestId(testID);
//     expect(foundScreen).toBeTruthy();
//   });
// });
