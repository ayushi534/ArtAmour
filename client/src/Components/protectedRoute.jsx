// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }) {
//   const storedUser = JSON.parse(localStorage.getItem("adminUser"));

//   // not logged in?
//   if (!storedUser) return <Navigate to="/admin/login" />;

//   // check role
//   if (role && storedUser.role !== role) {
//     return <Navigate to="/admin/login" />;
//   }

//   return children;
// }
// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const adminUser = localStorage.getItem("adminUser");

 
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
