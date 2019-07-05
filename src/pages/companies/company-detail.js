import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import {
  Row,
  Col,
  Form,
  Input,
  Table,
  Divider,
  Typography,
  Button,
  message,
} from 'antd';

import { getEmployees, deleteEmployee } from '../../redux/actions';
import Layout from '../../components/layout';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function CompanyDetail({ match }) {
  const company = useSelector(state =>
    Array.isArray(state.companies.list)
      ? state.companies.list.find(c => c._id === match.params.id)
      : null
  );
  const allEmployees = useSelector(state => state.employees.list);
  const employees =
    Array.isArray(allEmployees) && company
      ? allEmployees.filter(employee => employee.company === company._id)
      : null;
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getEmployees(dispatch)({
      success: () => console.log('Load employees success!'),
      failure: e => console.log(`Load employees fail! Error: ${e}`),
    });
  }, [dispatch]);

  function handleDeleteEmployee(id) {
    return function() {
      deleteEmployee(dispatch)(id, {
        success: () => message.success('Delete employee successfully!'),
        failure: () => message.error('Delete employee unsuccessfully!'),
      });
    };
  }

  function handleUpdateEmployee(id) {
    return function() {
      history.push(`/employees/${id}/update`);
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
        <Link to={`/employees/${record.key}`}>{record.username}</Link>
      ),
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      key: 'role',
      render: (text, record) => (
        <span>
          {record.role === 1
            ? 'Staff'
            : record.role === 2
            ? 'Accountant'
            : record.role === 3
            ? 'Manager'
            : ''}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleUpdateEmployee(record.key)}>Update</a>
          <Divider type="vertical" />
          <a onClick={handleDeleteEmployee(record.key)}>Delete</a>
        </span>
      ),
    },
  ];

  const data = Array.isArray(employees)
    ? employees.map((employee, index) => ({
        key: employee._id,
        username: employee.username,
        fullname: employee.fullname,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
        no: index + 1,
      }))
    : null;

  return (
    <Layout>
      {company ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Company Detail</Typography.Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            onSubmit={e => {
              e.preventDefault();
              history.push('/');
            }}
          >
            <Form.Item label="Company ID">
              <Input readOnly value={company._id} />
            </Form.Item>
            <Form.Item label="Name">
              <Input readOnly value={company.name} />
            </Form.Item>
            <Form.Item label="Email">
              <Input readOnly value={company.email} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Back
              </Button>
            </Form.Item>
          </Form>
          <br />
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
          <Button
            onClick={() =>
              history.push(`/companies/${match.params.id}/create-employee`)
            }
          >
            Create employee
          </Button>
        </>
      ) : (
        <p>Company not found</p>
      )}
    </Layout>
  );
}

CompanyDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CompanyDetail;
