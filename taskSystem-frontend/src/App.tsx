import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
