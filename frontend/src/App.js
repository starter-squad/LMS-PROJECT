import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Course from './pages/course/course';
import Courses from './pages/course/Courses';
import Profile from './pages/profile/profile';
import Learnings from './pages/learning/learnings';
import Home from './pages/landing/Home';
import DUsers from './pages/dashBoard/DUsers';
import DCourses from './pages/dashBoard/DCourses';
import Assessment from './pages/assessment/Assessment';
import ErrorPage from './pages/error/ErrorPage';
import AddQuestions from './pages/dashBoard/AddQuestions';
import Performance from './pages/profile/Performance';
import Certificate from './pages/assessment/certificate';
import Forum from './pages/course/forum';
import AdminDashboard from './pages/dashBoard/AdminDashboard';
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";

// Protected Routes
import { AdminRoute, PrivateRoute } from './Components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Only Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/Dcourses"
            element={
              <AdminRoute>
                <DCourses />
              </AdminRoute>
            }
          />
          <Route
            path="/Dusers"
            element={
              <AdminRoute>
                <DUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/addquestions/:id"
            element={
              <AdminRoute>
                <AddQuestions />
              </AdminRoute>
            }
          />

          {/* Protected Routes (Logged in users - both admin and user) */}
          <Route path="/courses" element={ <Courses />} />
          <Route
            path="/course/:id"
            element={
              <PrivateRoute>
                <Course />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/Learnings"
            element={
              <PrivateRoute>
                <Learnings />
              </PrivateRoute>
            }
          />
          <Route
            path="/assessment/:id"
            element={
              <PrivateRoute>
                <Assessment />
              </PrivateRoute>
            }
          />
          <Route
            path="/certificate/:courseId"
            element={
              <PrivateRoute>
                <Certificate />
              </PrivateRoute>
            }
          />
          <Route
            path="/discussion/:id"
            element={
              <PrivateRoute>
                <Forum />
              </PrivateRoute>
            }
          />
          <Route
            path="/Performance"
            element={
              <PrivateRoute>
                <Performance />
              </PrivateRoute>
            }
          />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* 404 Error Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;