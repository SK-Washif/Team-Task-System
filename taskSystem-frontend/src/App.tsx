import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskPage } from "./pages/TaskPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
