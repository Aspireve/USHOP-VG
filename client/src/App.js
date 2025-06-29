import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header/index";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import PlaceOrder from "./pages/PlaceOrder";
import OrderList from "./pages/OrdersList";
import ProductList from "./pages/ProductList";
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser";
import EditProduct from "./pages/EditProduct";
import Order from "./pages/Order";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import * as routes from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path={routes.HOME} element={<Home />} />
            <Route path={routes.PRODUCT} element={<Product />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.CART} element={<Cart />} />
            <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path={routes.SHIPPING} element={<Shipping />} />
              <Route path={routes.PAYMENT} element={<Payment />} />
              <Route path={routes.PLACE_ORDER} element={<PlaceOrder />} />
              <Route path={routes.ORDER} element={<Order />} />
              <Route path={routes.PROFILE} element={<Profile />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
              <Route path={routes.ORDERS} element={<OrderList />} />
              <Route path={routes.PRODUCTS} element={<ProductList />} />
              <Route path={routes.PRODUCT_EDIT} element={<EditProduct />} />
              <Route path={routes.USERS} element={<UserList />} />
              <Route path={routes.USER_EDIT} element={<EditUser />} />
            </Route>
            <Route path={routes.REGISTER} element={<Register />} />
            <Route
              path={routes.EMAIL_VERIFICATION}
              element={<EmailVerification />}
            />
            <Route path={routes.LOGOUT} element={<Logout />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
