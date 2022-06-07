import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Purchase from "./pages/Home/Purchase";
import RequireAuth from "./pages/requireAuth/RequireAuth";
import DashBoard from "./pages/Header/DashBoard";
import MyProfile from "./pages/Header/MyProfile";
import MyOrders from "./pages/Header/MyOrders";
import Review from "./pages/Header/Review";
import Blog from "./pages/Home/Blog";
import Portfolio from "./pages/Header/Portfolio";
import AllUsers from "./pages/Header/AllUsers";
import RequireAdmin from "./pages/requireAuth/RequireAdmin";
import AddTools from "./pages/Header/AddTools";
import Payment from "./pages/Header/Payment";
import Error from "./pages/error/Error";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="review" element={<Review />} />
          <Route path="payment/:orderId" element={<Payment />} />
          <Route
            path="users"
            element={
              <RequireAdmin>
                <AllUsers />
              </RequireAdmin>
            }
          />
          <Route
            path="addtools"
            element={
              <RequireAdmin>
                <AddTools />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
