import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Dropdown, Button, message } from 'antd';

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

function LayoutWrapper({ children }) {
  const dispatch = useDispatch();
  const name = useSelector(state => state.admins.info.fullName);
  const { location, history } = useReactRouter();
  const { pathname } = location;

  function handleClickLogout() {
    logout(dispatch)();
    history.push('/login');
    message.success('Logout successfully!');
  }

  const activeSideBar =
    pathname === '/' || /\/posts/.test(pathname)
      ? '1'
      : /\/admins/.test(pathname)
      ? '2'
      : /\/categories/.test(pathname)
      ? '3'
      : undefined;

  // console.log(pathname);

  // const Breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Layout>
      <HeaderWrapper>
        <Logo>Admin Dashboard</Logo>
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
          <Button>{name}</Button>
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
              Hubs
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                history.push('/employees');
              }}
            >
              Employees
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                history.push('/categories');
              }}
            >
              Rental booking
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
