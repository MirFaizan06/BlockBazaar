import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ToastContainer from './components/admin/ToastContainer';
import AdminRoute from './guards/AdminRoute';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import ModDetail from './pages/ModDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Team from './pages/Team';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMods from './pages/admin/AdminMods';
import AdminModForm from './pages/admin/AdminModForm';
import AdminTeam from './pages/admin/AdminTeam';
import AdminTeamForm from './pages/admin/AdminTeamForm';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="mod/:slug" element={<ModDetail />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="team" element={<Team />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="mods" element={<AdminMods />} />
          <Route path="mods/new" element={<AdminModForm />} />
          <Route path="mods/edit/:id" element={<AdminModForm />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="team/new" element={<AdminTeamForm />} />
          <Route path="team/edit/:id" element={<AdminTeamForm />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AnimatedRoutes />
            <ToastContainer />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
