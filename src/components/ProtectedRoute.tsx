import { useEffect, useState } from "react";
import { getMyProfile } from "../features/userSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {  isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await dispatch(getMyProfile());
        console.log(res.payload);
        if (res.payload?.data?.user) {
          setLoading(false); 
        } else {
          setLoading(false); // No user data found
        }
      } catch (error) {
        setLoading(false); // Handle any errors gracefully
      }
    };
    fetchMyProfile();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
