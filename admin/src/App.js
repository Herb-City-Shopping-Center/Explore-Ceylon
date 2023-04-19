import "./App.css";
import { Route } from "react-router-dom";

import AdminDashboard from "./pages/Dashboard";
import Blog from "./Client_Components/Blog";
import GuideDashboard from "./Guide/GuideDashboard";
import {


  ClerkProvider,
  SignedIn,
  SignedOut,
  SignUp,
  RedirectToSignIn,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <div className="App">
      <ClerkProvider publishableKey={clerkPubKey}>
        <Route path="/" component={Blog} exact />

        <SignedIn>
          <Route path="/guide/dashboard" component={GuideDashboard} exact />
          <Route path="/admin" component={AdminDashboard} exact />
        </SignedIn>

        {/* <SignedOut>
          <RedirectToSignIn />
        </SignedOut> */}
      </ClerkProvider>
    </div>
  );
}

export default App;
