import Activity from '../Components/Pages/Activity';
import ActivityEdit from '../Components/Pages/Activity/edit/ActivityEdit';
import ImportInstructions from '../Components/Pages/Activity/importInstructions/ImportInstructions';
import ActivityDetail from '../Components/Pages/Activity/show/ActivityDetail';

export const routes = [
  { path: `${process.env.PUBLIC_URL}/app/activity/list`, Component: <Activity /> },
  { path: `${process.env.PUBLIC_URL}/app/activity/new`, Component: <ActivityEdit /> },
  { path: `${process.env.PUBLIC_URL}/app/activity/show/:id`, Component: <ActivityDetail /> },
  { path: `${process.env.PUBLIC_URL}/app/activity/import/:id`, Component: <ImportInstructions /> },
];
