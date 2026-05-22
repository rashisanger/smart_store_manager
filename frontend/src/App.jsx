import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { lazy, Suspense } from "react";
import { useAuth } from "./context/AuthContext";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const AITools = lazy(() => import("./pages/AITools"));

const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));

const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-[#071120] text-white">
    Loading...
  </div>
);

const PrivateRoute = ({ children }) => {
  const { token } = useAuth() || {};

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-[#071120] text-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 ml-56">
        <Navbar />

        <main className="p-6 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/ai-tools"
          element={
            <PrivateRoute>
              <AITools />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;