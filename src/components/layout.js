import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from 'antd';

import { logout } from '../redux/actions';

const { Header, Content, Sider } = Layout;

const HeaderWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

// const BREADCRUMB_ITEMS = {
//   companies: {
//     title: 'Companies',
//     to: '/',
//   },
//   updateCompany: {
//     title: 'Update company',
//   },
//   createCompany: {
//     title: 'Create company',
//   },
//   companyDetail: {
//     title: 'Company detail',
//   },
//   admins: {
//     title: 'Admins',
//     to: '/admins',
//   },
//   updateAdmin: {
//     title: 'Update admin',
//   },
//   createAdmin: {
//     title: 'Create admin',
//   },
//   adminDetail: {
//     title: 'Admin detail',
//   },
//   updateEmployee: {
//     title: 'Update employee',
//   },
//   createEmployee: {
//     title: 'Create employee',
//   },
//   employeeDetail: {
//     title: 'Employee detail',
//   },
//   profile: {
//     title: 'Profile',
//   },
// };

// function getBreadcrumbs(pathname) {
//   const {
//     companies,
//     updateCompany,
//     createCompany,
//     companyDetail,
//     admins,
//     updateAdmin,
//     createAdmin,
//     adminDetail,
//     updateEmployee,
//     createEmployee,
//     employeeDetail,
//     profile,
//   } = BREADCRUMB_ITEMS;
//   if (pathname === '/') return [companies];
//   if (pathname === '/companies/create-companies')
//     return [companies, createCompany];
//   if (/^\/companies\/.+\/update$/.test(pathname))
//     return [companies, updateCompany];
//   if (/^\/companies\/.+$/.test(pathname)) return [companies, companyDetail];
// }

function LayoutWrapper({ children }) {
  const dispatch = useDispatch();
  const fullname = useSelector(state => state.admins.info.fullname);
  const { location, history } = useReactRouter();
  const { pathname } = location;

  function handleClickLogout() {
    logout(dispatch)();
    history.push('/login');
  }

  const activeSideBar =
    pathname === '/' || /\/companies/.test(pathname)
      ? '1'
      : /\/admins/.test(pathname)
      ? '2'
      : undefined;

  // console.log(pathname);

  // const Breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Layout>
      <HeaderWrapper>
        <Logo>SAS Admin Dashboard</Logo>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={handleClickLogout}>Logout</Menu.Item>
            </Menu>
          }
          placement="bottomCenter"
        >
          <Button>{fullname}</Button>
        </Dropdown>
      </HeaderWrapper>
      <Layout>
        <Sider
          width={200}
          style={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[activeSideBar]}
            style={{
              minHeight: 'calc(100vh - 64px)',
              backgroundColor: '#f5f5f5',
              borderRight: 0,
            }}
          >
            <Menu.Item
              key="1"
              onClick={() => {
                history.push('/');
              }}
            >
              Companies
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                history.push('/admins');
              }}
            >
              Admins
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ background: '#fff', padding: '0 24px 24px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content style={{ margin: '24px 0' }}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

LayoutWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default LayoutWrapper;
