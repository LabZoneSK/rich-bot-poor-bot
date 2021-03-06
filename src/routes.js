import Assets from './assets';
import Dashboard from './dashboard';
import Settings from './settings';

const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: 'Assets',
    path: '/assets/:action',
    component: Assets
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Settings
  },
];

export default routes;