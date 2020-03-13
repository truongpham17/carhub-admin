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
    component: pages.hubList,
  },
  {
    key: 'create-hub',
    path: '/create-hub',
    exact: true,
    redirectTo: '/login',
    component: pages.createHub,
  },

  {
    key: 'employees',
    path: '/employees',
    exact: true,
    redirectTo: '/login',
    component: pages.employeeList,
  },
  {
    key: 'employees',
    path: '/employees/:id',
    exact: true,
    redirectTo: '/login',
    component: pages.updateEmployee,
  },
  {
    key: 'create-hub',
    path: '/create-employee',
    exact: true,
    redirectTo: '/employees/create-employee',
    component: pages.createEmployee,
  },
  {
    key: 'posts',
    path: '/posts',
    exact: true,
    redirectTo: '/login',
    component: pages.home,
  },
  {
    key: 'post-detail',
    path: '/posts/:id',
    exact: true,
    redirectTo: '/login',
    component: pages.postDetail,
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
    key: 'categories',
    path: '/categories',
    exact: true,
    redirectTo: '/login',
    component: pages.categories,
  },
  {
    key: 'create-category',
    path: '/categories/create-category',
    exact: true,
    redirectTo: '/login',
    component: pages.createCategory,
  },
  {
    key: 'update-category',
    path: '/categories/:id/update',
    exact: true,
    redirectTo: '/login',
    component: pages.updateCategory,
  },
  {
    key: 'category-detail',
    path: '/categories/:id',
    exact: true,
    redirectTo: '/login',
    component: pages.categoryDetail,
  },
  {
    key: 'create-productType',
    path: '/categories/:id/create-productType',
    exact: true,
    redirectTo: '/login',
    component: pages.createProductType,
  },
  {
    key: 'update-productType',
    path: '/productTypes/:id/update',
    exact: true,
    redirectTo: '/login',
    component: pages.updateProductType,
  },
  {
    key: 'productType-detail',
    path: '/productTypes/:id',
    exact: true,
    redirectTo: '/login',
    component: pages.productTypeDetail,
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
