import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./lib/PrivateRoute";
import { Dashboard } from "./pages/admin/Dashboard";
import { Experiences } from "./pages/admin/Experiences";
import Login from "./pages/admin/Login";
import { Profile } from "./pages/admin/Profile";
import { Projects } from "./pages/admin/Projects";
import { Techs } from "./pages/admin/Techs";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Profile />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/techs"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Techs />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/experiences"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Experiences />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <Projects />
                </AdminLayout>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
