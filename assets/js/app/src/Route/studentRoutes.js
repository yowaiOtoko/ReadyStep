import Activity from '../Components/Pages/Activity';
import ActivityEdit from '../Components/Pages/Activity/edit/ActivityEdit';
import ImportInstructions from '../Components/Pages/Activity/importInstructions/ImportInstructions';
import ActivityDetail from '../Components/Pages/Activity/show/ActivityDetail';
import { StudentDashboard } from '../Components/Pages/Student/StudentDashboard';
import Sessions from '../Components/Pages/Session/list';
import SessionShow from '../Components/Pages/Session/show/SessionShow';

export const studentRoutes = [
  { path: `home`, Component: <StudentDashboard /> },
  { path: `/app/activity/new`, Component: <ActivityEdit /> },
  { path: `/app/activity/show/:id`, Component: <ActivityDetail /> },
  { path: `/app/activity/import/:id`, Component: <ImportInstructions /> },
  { path: `/app/session/list`, Component: <Sessions/> },
  { path: `/app/session/show/:id`, Component: <SessionShow/> },
];
