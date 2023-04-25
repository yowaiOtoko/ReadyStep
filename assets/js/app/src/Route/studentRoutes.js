import Activity from '../Components/Pages/Activity';
import ActivityEdit from '../Components/Pages/Activity/edit/ActivityEdit';
import ImportInstructions from '../Components/Pages/Activity/importInstructions/ImportInstructions';
import ActivityDetail from '../Components/Pages/Activity/show/ActivityDetail';
import { StudentDashboard } from '../Components/Pages/Student/StudentDashboard';
import Sessions from '../Components/Pages/Session/list';
import SessionStudentShow from '../Components/Pages/Student/SessionStudentShow';

export const studentRoutes = [
  { path: `home`, Component: <StudentDashboard /> },
  { path: `session/list`, Component: <Sessions/> },
  { path: `session/show/:id`, Component: <SessionStudentShow/> },
];
