
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  lazy,
  Suspense,
} from "react";

import { useAuth } from "./context/AuthContext";

// ================= PAGES =================

const Login = lazy(() =>
  import("./pages/Login")
);

const Signup = lazy(() =>
  import("./pages/Signup")
);

const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);

const Products = lazy(() =>
  import("./pages/Products")
);

const AITools = lazy(() =>
  import("./pages/AITools")
);

// ================= COMPONENTS =================

const Navbar = lazy(() =>
  import("./components/Navbar")
);

const Sidebar = lazy(() =>
  import("./components/Sidebar")
);

// ================= LOADER =================

const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-[#071120]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="text-white text-lg font-semibold tracking-wide">
        Loading SmartStore AI...
      </h2>
    </div>
  </div>
);

// ================= PRIVATE ROUTE =================

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071120] via-[#0B1730] to-[#0F1C2E] text-white">
      {/* SIDEBAR */}
      <Suspense fallback={<PageLoader />}>
        <Sidebar />
      </Suspense>

      {/* MAIN CONTENT */}
      <div className="ml-56">
        {/* NAVBAR */}
        <Suspense fallback={<PageLoader />}>
          <Navbar />
        </Suspense>

        {/* PAGE CONTENT */}
        <main className="pt-20 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

// ================= APP =================

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PRIVATE ROUTES */}

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

        {/* FALLBACK */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;

