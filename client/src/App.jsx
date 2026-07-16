  import { Routes, Route } from "react-router-dom";

  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Dashboard from "./pages/Dashboard";
  import Upload from "./pages/Upload";
  import Notes from "./pages/Notes";
  import Quiz from "./pages/Quiz";
  import NotFound from "./pages/NotFound";
  import ProtectedRoute from "./components/ProtectedRoute";
  import Documents from "./pages/Documents";
  import DocumentDetails from "./pages/DocumentDetails";
  import Flashcards from "./pages/Flashcards";
  import Chat from "./pages/Chat";
  import TestingDashboard from "./pages/TestingDashboard";
import Profile from "./pages/Profile";

  export default function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents/:id/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents/:id"
          element={
            <ProtectedRoute>
              <DocumentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents/:id/flashcards"
          element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/documents/:id/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
    path="/documents/:id/chat"
    element={
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    }
  />

        <Route path="/test" element={<TestingDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
