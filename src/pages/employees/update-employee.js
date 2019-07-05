import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Typography,
  message,
} from 'antd';

import Layout from '../../components/layout';
import { updateEmployee, getEmployees } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function UpdateEmployee({ match, form }) {
  // Form
  const { getFieldDecorator } = form;

  const employee = useSelector(state =>
    Array.isArray(state.employees.list)
      ? state.employees.list.find(c => c._id === match.params.id)
      : null
  );
  const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateEmployee(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const {
        username,
        fullname,
        role,
        email,
        phone,
        password,
        confirm,
      } = values;

      if (!err) {
        if (role === '1' || role === '2' || role === '3') {
          const data =
            !password && !confirm
              ? {
                  username,
                  fullname,
                  role,
                  email,
                  phone,
                }
              : password === confirm
              ? {
                  username,
                  password,
                  fullname,
                  role,
                  email,
                  phone,
                }
              : null;
          if (data)
            updateEmployee(dispatch)(match.params.id, data, {
              success: () => {
                getEmployees(dispatch);
                history.push(`/companies/${employee.company}`);
                message.success('Update employee successfully!');
              },
              failure: () => message.error('Update employee unsuccessfully!'),
            });
        }
      }
    });
  }

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter are inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const submitDisabled =
    !form.getFieldValue('username') ||
    (typeof form.getFieldValue('username') === 'string' &&
      (form.getFieldValue('username').length < 3 ||
        form.getFieldValue('username').length > 120)) ||
    !form.getFieldValue('fullname') ||
    (typeof form.getFieldValue('fullname') === 'string' &&
      (form.getFieldValue('fullname').length < 3 ||
        form.getFieldValue('fullname').length > 80)) ||
    !form.getFieldValue('email') ||
    (typeof form.getFieldValue('email') === 'string' &&
      form.getFieldValue('email').length > 120) ||
    !form.getFieldValue('phone') ||
    (typeof form.getFieldValue('phone') === 'string' &&
      form.getFieldValue('phone').length !== 10) ||
    !form.getFieldValue('role') ||
    (typeof form.getFieldValue('role') === 'string' &&
      !(
        form.getFieldValue('role') === '1' ||
        form.getFieldValue('role') === '2' ||
        form.getFieldValue('role') === '3'
      )) ||
    (form.getFieldValue('password') &&
      (!form.getFieldValue('password') ||
        (typeof form.getFieldValue('password') === 'string' &&
          (form.getFieldValue('password').length < 6 ||
            form.getFieldValue('password').length > 120)) ||
        !form.getFieldValue('confirm') ||
        (typeof form.getFieldValue('confirm') === 'string' &&
          (form.getFieldValue('confirm').length < 6 ||
            form.getFieldValue('confirm').length > 120)) ||
        form.getFieldValue('password') !== form.getFieldValue('confirm')));

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Update Employee</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleUpdateEmployee}>
        <Form.Item label="Employee ID">
          {getFieldDecorator('employeeID', {
            initialValue: employee._id,
            rules: [
              {
                required: true,
                message: 'Please input employee ID!',
              },
            ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="Company ID">
          {getFieldDecorator('companyID', {
            initialValue: employee.company,
            rules: [
              {
                required: true,
                message: 'Please input company ID!',
              },
            ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            initialValue: employee.username,
            rules: [
              {
                required: true,
                message: 'Please input username!',
              },
              {
                min: 3,
                message: 'Username must be at least 3 characters!',
              },
              {
                max: 120,
                message: 'Username must be at most 120 characters!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Fullname">
          {getFieldDecorator('fullname', {
            initialValue: employee.fullname,
            rules: [
              {
                required: true,
                message: 'Please input fullname!',
              },
              {
                min: 3,
                message: 'Username must be at least 3 characters!',
              },
              {
                max: 80,
                message: 'Username must be at most 80 characters!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            initialValue: employee.email,
            rules: [
              {
                type: 'email',
                message: 'Please input valid email!',
              },
              {
                required: true,
                message: 'Please input email!',
              },
              {
                max: 120,
                message: 'Email must be at most 120 characters!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone">
          {getFieldDecorator('phone', {
            initialValue: employee.phone,
            rules: [
              {
                required: true,
                message: 'Please input phone!',
              },
              {
                min: 10,
                max: 10,
                message: 'Phone must be 10 characters!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Role" hasFeedback>
          {getFieldDecorator('role', {
            initialValue: `${employee.role}`,
            rules: [{ required: true, message: 'Please select role!' }],
          })(
            <Select placeholder="Please select a role">
              <Select.Option value="1">Staff</Select.Option>
              <Select.Option value="2">Accountant</Select.Option>
              <Select.Option value="3">Manager</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                validator: validateToNextPassword,
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters!',
              },
              {
                max: 120,
                message: 'Password must be at most 120 characters!',
              },
            ],
          })(
            <Input.Password placeholder="Let this blank if you do not want to change password" />
          )}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              placeholder="Let this blank if you do not want to change password"
              onBlur={handleConfirmBlur}
            />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button disabled={submitDisabled} type="primary" htmlType="submit">
            Update
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" onClick={() => history.goBack()}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

UpdateEmployee.propTypes = {
  match: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'update-employee' })(UpdateEmployee);
