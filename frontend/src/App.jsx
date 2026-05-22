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
  <div className="h-screen w-full flex flex-col items-center justify-center bg-[#020817] text-white gap-4">
    <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
    <p className="text-gray-400 font-medium tracking-wider animate-pulse">Loading SmartStore AI...</p>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { token } = useAuth() || {};

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-[#020817] text-white">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 ml-56 flex flex-col">
        <Navbar />

        <main className="p-6 pt-20 flex-1 overflow-y-auto">
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
