import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getRouterBasename } from "./lib/router";
import ShellLayout from "./components/ShellLayout";
import DashboardHome from "./pages/DashboardHome";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import PlaygroundPage from "./pages/PlaygroundPage";
import ThinkingPage from "./pages/ThinkingPage";
import ThinkingDetail from "./pages/ThinkingDetail";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <Routes>
        <Route element={<ShellLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="thinking" element={<ThinkingPage />} />
          <Route path="thinking/:slug" element={<ThinkingDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
