import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import Login from "./Login";
import Register from "./Register"; // Ensure this component is imported
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./components/AuthComponent";

// Header component with conditional rendering based on authentication
const Header: React.FC = () => {
  const { token, logout } = useAuth();

  console.log("Akbar: ", process.env.REACT_APP_API_URL);
  return (
    <div className="app-header">
      <div className="header-container">
        <Link to="/" className="header-title" style={{ color: "#fff" }}>
          ShuffleEvents
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {!token ? (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          ) : (
            <span
              onClick={logout}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
          )}
        </nav>
      </div>
    </div>
  );
};

// A wrapper component for protected routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();

  if (!token) {
    return <Login />; // Redirect to login if not authenticated
  }

  return <>{children}</>;
};

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Header />
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
        {/* Protected Routes */}
        <Route
          path="/event/:id"
          element={
            <ProtectedRoute>
              <EventDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
