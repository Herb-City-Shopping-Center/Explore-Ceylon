import './App.css';
import {Route} from 'react-router-dom'
import Dashboard from "./Guide/Dashboard";
import Blog from "./compenents/Blog";

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

        <SignedIn>
          <Route
            path="/"
            component={Blog}
            exact
          />
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        
      </ClerkProvider>

    </div>
  );
}

export default App;
