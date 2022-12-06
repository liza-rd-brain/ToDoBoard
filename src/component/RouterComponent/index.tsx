import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectBoard } from "../../pages/ProjectBoard";
import { TaskBoard } from "../../pages/TaskBoard";

/**Here defines all routes */
export const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectBoard />} />
        <Route path="/project/:id/" element={<TaskBoard />}>
          <Route path="task/new" element={<TaskBoard /* type */ />} />
          <Route path="task/:id" element={<TaskBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
