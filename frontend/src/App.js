import "./App.css";
import { Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import ServiceSupplierDashboard from "./pages/ServiceSupplierDashboard"

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

import ProductView from "./Client_Components/ProductView";
import Checkout from './Client_Components/orderCheckout/Checkout';
import Stripe from "./Client_Components/orderCheckout/Stripe";
import PaymentForm from "./Client_Components/orderCheckout/PaymentForm";
import Review from "./Client_Components/orderCheckout/Review";
import Cart from "./Client_Components/Cart";
import CustomerOrders from "./Client_Components/CustomerOrders";

import GuideAndHotelMng from './Admin_Components/GuideAndHotelMng';
import AdminOrders from './Admin_Components/TouristBookings';
import Reviews from "./Admin_Components/Reviews";
import Articals from "./Admin_Components/Articals";
import HotelBookings from "./Hotel_Component/HotelBookings";
import HotelPackages from "./Hotel_Component/HotelPackages";

const clerkPubKey = 'pk_test_c3RyaWtpbmctbXVsbGV0LTgyLmNsZXJrLmFjY291bnRzLmRldiQ';

function App() {
  return (
    <div className="App">
      <ClerkProvider publishableKey={clerkPubKey}>
        <Route path="/" component={HomePage} exact />
        <Route path="/product/view" component={ProductView} exact />

        <SignedIn>
          <Route path="/product/checkout" component={Checkout} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/orders" component={CustomerOrders} exact />
          <Route path="/order/review" component={Review} exact />

          <Route path="/guide/dashboard" component={ServiceSupplierDashboard} exact />
          <Route path="/guide/bookings" component={GuideBookings} exact />
          <Route path="/guide/packages" component={GuidePackages} exact />

          {/* Hotel  */}
          <Route path="/hotel/dashboard" component={ServiceSupplierDashboard} exact />
          <Route path="/hotel/bookings" component={HotelBookings} exact />
          <Route path="/hotel/packages" component={HotelPackages} exact />
          {/* <Route path="/hotel/bookings" component={HotelPackages} exact /> */}

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
