import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectBoard } from "../../pages/ProjectBoard";
import { TaskBoard } from "../../pages/TaskBoard";
import { Preloader } from "../Preloader";

/**Here defines all routes */
// export const RouterComponent = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ProjectBoard />} />
//         <Route
//           path="project/:id"
//           element={<TaskBoard viewType={"taskBoard"} />}
//         />

//         <Route
//           path="/project/:id/task/new"
//           element={<TaskBoard viewType={"task"} />}
//         />
//         <Route
//           path="/project/:id/task/:id"
//           element={<TaskBoard viewType={"task"} />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

export const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectBoard />} />
        <Route
          path="project/:id"
          element={<TaskBoard viewType={"taskBoard"} />}
        >
          <Route path="task/new" element={<Preloader type="big" />} />
        </Route>

        {/* <Route path="task/new" element={<TaskBoard viewType={"task"} />} />
        <Route path="task/:id" element={<TaskBoard viewType={"task"} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
