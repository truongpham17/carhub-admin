import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography } from 'antd';

import Layout from '../../components/layout';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function EmployeeDetail({ match }) {
  const employee = useSelector(state =>
    Array.isArray(state.employees.list)
      ? state.employees.list.find(c => c._id === match.params.id)
      : null
  );
  const { history } = useReactRouter();

  const role =
    employee.role === 1
      ? 'Staff'
      : employee.role === 2
      ? 'Accountant'
      : employee.role === 3
      ? 'Manager'
      : '';

  return (
    <Layout>
      {employee ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Employee Detail</Typography.Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            onSubmit={e => {
              e.preventDefault();
              history.goBack();
            }}
          >
            <Form.Item label="Employee ID">
              <Input readOnly value={employee._id} />
            </Form.Item>
            <Form.Item label="Company ID">
              <Input readOnly value={employee.company} />
            </Form.Item>
            <Form.Item label="Username">
              <Input readOnly value={employee.username} />
            </Form.Item>
            <Form.Item label="Fullname">
              <Input readOnly value={employee.fullname} />
            </Form.Item>
            <Form.Item label="Email">
              <Input readOnly value={employee.email} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input readOnly value={employee.phone} />
            </Form.Item>
            <Form.Item label="Role" hasFeedback>
              <Input readOnly value={role} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Back
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        'Employee not found'
      )}
    </Layout>
  );
}

EmployeeDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default EmployeeDetail;
