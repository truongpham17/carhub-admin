import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { Table, Divider, Typography, Button, message, Avatar } from 'antd';
import './employee.scss';
import moment from 'moment';

import Layout from '../../components/layout';

import {
  getEmployeeList,
  getEmployeeDetail,
  getHubList,
} from '../../redux/actions';

const { Title } = Typography;

function EmployeeList() {
  const employees = useSelector(state => state.employees.employees);

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getEmployeeList(dispatch)({
      success: () => console.log('Load employees success!'),
      failure: e => console.log(`Load employees fail! Error: ${e}`),
    });
  }, [dispatch]);

  // function handleDeletePost(id) {
  //   return function() {
  //     deletePost(dispatch)(id, {
  //       success: () => message.success('Delete post successfully!'),
  //       failure: () => message.error('Delete post unsuccessfully!'),
  //     });
  //   };
  // }

  // function handleApprovePost(id) {
  //   return function() {
  //     updatePost(dispatch)(
  //       id,
  //       { published: true },
  //       {
  //         success: () => message.success('Delete post successfully!'),
  //         failure: () => message.error('Delete post unsuccessfully!'),
  //       }
  //     );
  //   };
  // }

  function handleUpdateEmployee(_id) {
    return function() {
      getEmployeeDetail(dispatch)(_id, {
        success: () => {
          getHubList(dispatch)(_id, {
            success: () => history.push(`/update_employee/${_id}`),
            failure: e => console.log(`Load hubs fail! Error: ${e}`),
          });
        },
        failure: error => {
          console.log(error);
          message.error('Fail to load employee');
        },
      });
    };
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    // {
    //   title: 'Avatar',
    //   key: 'avatar',
    //   render: item => <Avatar shape="circle" size="large" src={item.avatar} />,
    // },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Birthday',
      key: 'dateOfBirth',
      dataIndex: 'dateOfBirth',
    },
    {
      title: 'Hub',
      key: 'hub',
      dataIndex: 'hub',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleUpdateEmployee(record.key)}>Update</a>
          <Divider type="vertical" />
          <a>Remove</a>
          {/* <Divider type="vertical" />
          <a onClick={handleDeletePost(record.key)}>Delete</a>  */}
        </span>
      ),
    },
  ];

  const data = Array.isArray(employees)
    ? employees
        .filter(employee => employee.account.isActive)
        .map((employee, index) => ({
          key: employee._id,
          avatar: employee.avatar,
          name: employee.fullName,
          phone: employee.phone,
          dateOfBirth: moment(employee.dateOfBirth).format('DD-MM-YYYY'),
          hub: employee.hub.name,
          no: index + 1,
        }))
    : null;

  return (
    <Layout>
      <Title>Employees</Title>
      {Array.isArray(data) && Array.isArray(employees) ? (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      ) : (
        <p>Loading employees</p>
      )}
      <br />

      <div className="button" onClick={() => history.push('/create-employee')}>
        <Button>Create employee</Button>
      </div>
    </Layout>
  );
}

export default EmployeeList;
