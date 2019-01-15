import React from 'react';
import Layout from './containers/Layout';
const Dashboard = React.lazy(() => import('./Dashboard'));
const Header = React.lazy(() => import('./containers/Header'));
const Footer = React.lazy(() => import('./containers/Footer'));
const Profile = React.lazy(() => import('./Profile'));
const Login = React.lazy(() => import('./Login'));
const Projects = React.lazy(() => import('./Projects'));
import Register from "./Register";
import ProjectPage from "./ProjectPage";
import Invitation from "./Invitation";

const routes = [
  { path: '/profile', name: 'Profile', component: Profile},
  { path: '/projects', name: 'Projects', component: Projects},
  { path: '/project/:projectID', name: 'ProjectPage', component: ProjectPage},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard},
  { path: '/header', name: 'Header', component: Header },
  { path: '/footer', name: 'Footer', component: Footer},
  { path: '/invitation', name: 'Invitation', component: Invitation },
];

export default routes;
