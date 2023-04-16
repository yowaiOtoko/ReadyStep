import Activity from '../Components/Pages/Activity';
import ActivityEdit from '../Components/Pages/Activity/edit/ActivityEdit';
import ImportInstructions from '../Components/Pages/Activity/importInstructions/ImportInstructions';
import ActivityDetail from '../Components/Pages/Activity/show/ActivityDetail';
import Sessions from '../Components/Pages/Session/list';
import SessionShow from '../Components/Pages/Session/show/SessionShow';

export const teachRoutes = [
  { path: 'home', Component: <Activity /> },
  { path: `activity/list`, Component: <Activity /> },
  { path: `activity/new`, Component: <ActivityEdit /> },
  { path: `activity/show/:id`, Component: <ActivityDetail /> },
  { path: `activity/import/:id`, Component: <ImportInstructions /> },
  { path: `session/list`, Component: <Sessions/> },
  { path: `session/show/:id`, Component: <SessionShow/> },
];
