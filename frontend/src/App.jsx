import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { lazy, Suspense } from "react";

import { useAuth } from "./context/AuthContext";

// LAZY PAGES
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

// COMPONENTS
const Navbar = lazy(() =>
  import("./components/Navbar")
);

const Sidebar = lazy(() =>
  import("./components/Sidebar")
);

// PRIVATE ROUTE
const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* SIDEBAR */}
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
      </Suspense>

      {/* MAIN */}
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
          Loading...
        </div>
      }
    >
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PRIVATE */}
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
          element={<Navigate to="/" />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;