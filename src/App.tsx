import React, { lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getMyProfile } from "./features/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Domains = lazy(() => import("./pages/domains/Domains"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const Monitizers = lazy(() => import("./pages/monitizers/Monitizers"));
const AdminDashboard = lazy(
  () => import("./pages/adminDashboard/AdminDashboard")
);

const App = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      const res = await dispatch(getMyProfile());
      setUser(res.payload.data);
    };
    fetchMyProfile();
  }, [dispatch]);

  return (
    <>
      <Navbar user={user} />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/monitizers" element={<Monitizers />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
