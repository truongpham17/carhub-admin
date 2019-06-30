import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from './private-route';
import pages from '../pages';

const publicRoutes = [
  {
    key: 'login',
    path: '/login',
    exact: true,
    component: pages.login,
  },
];

const privateRoutes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    redirectTo: '/login',
    component: pages.home,
  },
  {
    key: 'companies',
    path: '/companies',
    exact: true,
    redirectTo: '/login',
    component: pages.home,
  },
  {
    key: 'create-company',
    path: '/companies/create-company',
    exact: true,
    redirectTo: '/login',
    component: pages.createCompany,
  },
  {
    key: 'update-company',
    path: '/companies/:id/update',
    exact: true,
    redirectTo: '/login',
    component: pages.updateCompany,
  },
  {
    key: 'company-detail',
    path: '/companies/:id',
    exact: true,
    redirectTo: '/login',
    component: pages.companyDetail,
  },
  {
    key: 'create-employee',
    path: '/companies/:id/create-employee',
    exact: true,
    redirectTo: '/login',
    component: pages.createEmployee,
  },
  {
    key: 'update-employee',
    path: '/employees/:id/update',
    exact: true,
    redirectTo: '/login',
    component: pages.updateEmployee,
  },
  {
    key: 'employee-detail',
    path: '/employees/:id',
    exact: true,
    redirectTo: '/login',
    component: pages.employeeDetail,
  },
  {
    key: 'admins',
    path: '/admins',
    exact: true,
    redirectTo: '/login',
    component: pages.admins,
  },
  {
    key: 'create-admin',
    path: '/admins/create-admin',
    exact: true,
    redirectTo: '/login',
    component: pages.createAdmin,
  },
  {
    key: 'admin-detail',
    path: '/admins/:id',
    exact: true,
    redirectTo: '/login',
    component: pages.adminDetail,
  },
  {
    key: 'update-admin',
    path: '/admins/:id/update',
    exact: true,
    redirectTo: '/login',
    component: pages.updateAdmin,
  },
  {
    key: 'profile',
    path: '/profile',
    exact: true,
    redirectTo: '/login',
    component: pages.profile,
  },
  {
    key: '404',
    component: pages.notFound,
  },
];

export default [
  ...publicRoutes.map(route => (
    <Route
      key={route.key}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  )),
  ...privateRoutes.map(route => (
    <PrivateRoute
      key={route.key}
      path={route.path}
      exact={route.exact}
      component={route.component}
      redirectTo={route.redirectTo}
    />
  )),
];
