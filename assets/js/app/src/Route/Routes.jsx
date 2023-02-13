// //Samp lePage
import Activity from '../Components/Pages/Activity';
import ActivityEdit from '../Components/Pages/Activity/edit/ActivityEdit';
import SamplePage from '../Components/Pages/PageLayout/SimplePage';

export const routes = [
  // //page
  { path: `${process.env.PUBLIC_URL}/activity`, Component: <Activity /> },
  { path: `${process.env.PUBLIC_URL}/app/activity/new`, Component: <ActivityEdit /> },
  { path: `${process.env.PUBLIC_URL}/pages/sample-page/:layout`, Component: <SamplePage /> },
];
