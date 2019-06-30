import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { Table, Divider, Typography, Button } from 'antd';

import Layout from '../../components/layout';

import { getAdmins, deleteAdmin } from '../../redux/actions';

const { Title } = Typography;

function AdminsPage() {
  const id = useSelector(state => state.admins.info._id);
  const admins = useSelector(state => state.admins.list);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getAdmins(dispatch)({
      success: () => console.log('Load admins success!'),
      failure: e => console.log(`Load admins fail! Error: ${e}`),
    });
  }, [dispatch]);

  function handleUpdateAdmin(_id) {
    return function() {
      history.push(`/admins/${_id}/update`);
    };
  }

  function handleDeleteAdmin(_id) {
    return function() {
      deleteAdmin(dispatch)(_id, {
        success: () => console.log('Delete admin success!'),
        failure: e => console.log(`Delete admin fail! Error: ${e}`),
      });
    };
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Username',
      key: 'username',
      render: (text, record) => (
        <Link to={`/admins/${record.key}`}>{record.username}</Link>
      ),
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleUpdateAdmin(record.key)}>Update</a>

          {id !== record.key && (
            <>
              <Divider type="vertical" />
              <a onClick={handleDeleteAdmin(record.key)}>Delete</a>
            </>
          )}
        </span>
      ),
    },
  ];

  const data = Array.isArray(admins)
    ? admins.map((admin, index) => ({
        key: admin._id,
        username: admin.username,
        fullname: admin.fullname,
        phone: admin.phone,
        no: index + 1,
      }))
    : null;

  return (
    <Layout>
      <Title>Admins</Title>
      {Array.isArray(admins) ? (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      ) : (
        <p>Loading admins</p>
      )}
      <br />
      <Button onClick={() => history.push('/admins/create-admin')}>
        Create admin
      </Button>
    </Layout>
  );
}

export default AdminsPage;
