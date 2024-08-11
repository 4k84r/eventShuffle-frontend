import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode; // Type definition for children
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/"); // Redirect to home or any other route upon login
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login on logout
  };

  useEffect(() => {
    if (
      !token &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
