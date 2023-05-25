import "./App.css";
import { Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import ServiceSupplierDashboard from "./pages/ServiceSupplierDashboard";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignUp,
  RedirectToSignIn,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";
import GuideBookings from "./Guide_Components/GuideBookings";
import SellerShop from './Guide_Components/SellerShop';
import GuidePackages from './Guide_Components/GuidePackages';
import ProductView from "./Client_Components/GuidePackageView";
import Checkout from './Client_Components/orderCheckout/Checkout';
import Stripe from "./Client_Components/orderCheckout/Stripe";
import PaymentForm from "./Client_Components/orderCheckout/PaymentForm";
import Review from "./Client_Components/orderCheckout/Review";
import CustomerOrders from "./Client_Components/CustomerOrders";
import GuideAndHotelMng from './Admin_Components/GuideAndHotelMng';
import AdminOrders from './Admin_Components/TouristBookings';
import Reviews from "./Admin_Components/Reviews";
import Articals from "./Admin_Components/Articals";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <div className="App">
      <ClerkProvider publishableKey={clerkPubKey}>
        <Route path="/" component={HomePage} exact />  
        <Route path="/package/view" component={ProductView} exact />

        <SignedIn>
          <Route path="/package/booking" component={Checkout} exact />
          <Route path="/bookings" component={CustomerOrders} exact />
          <Route path="/order/review" component={Review} exact />
          {/* <Route path="/hotel-bookings" component={} exact /> */}

          <Route path="/guide/dashboard" component={ServiceSupplierDashboard} exact />
          <Route path="/guide/bookings" component={GuideBookings} exact />
          <Route path="/guide/packages" component={GuidePackages} exact />
          {/* <Route path="/guide/shop" component={sellerShop} exact /> */}

          <Route path="/admin" component={AdminDashboard} exact />
          <Route path="/admin/guide-hotel-mng" component={GuideAndHotelMng} exact />
          <Route path="/admin/guide-review" component={Reviews} exact />
          <Route path="/admin/guide-articals" component={Articals} exact />
          <Route path="/admin/tourist-bookings" component={AdminOrders} exact />
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </div>
  );
}

export default App;
