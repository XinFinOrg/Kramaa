import React from 'react';
import Layout from './containers/Layout';

import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ProjectPage from "./ProjectPage";
import Invitation from "./Invitation";
import Header from "./containers/Header";
import Footer from "./containers/Footer";

const routes = [
  { path: '/header', name: 'Header', component: Header, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/footer', name: 'Footer', component: Footer, exact: true },
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/invitation', name: 'Invitation', component: Invitation },
  { path: '/profile', name: 'Profile', component: Profile, exact: true },
];

export default routes;
