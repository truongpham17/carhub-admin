import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography } from 'antd';

import Layout from '../../components/layout';
import { createAdmin, getAdmins } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function CreateAdmin({ form }) {
  // Form
  const { getFieldDecorator } = form;

  const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleCreateAdmin(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { username, fullname, email, phone, password, confirm } = values;

      if (!err) {
        const data =
          password === confirm
            ? {
                username,
                password,
                fullname,
                email,
                phone,
              }
            : null;
        if (data)
          createAdmin(dispatch)(data, {
            success: () => {
              getAdmins(dispatch);
              history.push(`/admins`);
            },
            failure: () => console.log('Create fail!'),
          });
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
    !form.getFieldValue('password') ||
    (typeof form.getFieldValue('password') === 'string' &&
      (form.getFieldValue('password').length < 6 ||
        form.getFieldValue('password').length > 120)) ||
    !form.getFieldValue('confirm') ||
    (typeof form.getFieldValue('confirm') === 'string' &&
      (form.getFieldValue('confirm').length < 6 ||
        form.getFieldValue('confirm').length > 120)) ||
    form.getFieldValue('password') !== form.getFieldValue('confirm');

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Create Admin</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleCreateAdmin}>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
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
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                validator: validateToNextPassword,
              },
              {
                required: true,
                message: 'Please input password!',
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
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                validator: compareToFirstPassword,
              },
              {
                required: true,
                message: 'Please confirm password!',
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="Fullname">
          {getFieldDecorator('fullname', {
            rules: [
              {
                required: true,
                message: 'Please input fullname!',
              },
              {
                min: 3,
                message: 'Fullname must be at least 3 characters!',
              },
              {
                max: 80,
                message: 'Fullname must be at most 80 characters!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
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
        <Form.Item {...tailFormItemLayout}>
          <Button disabled={submitDisabled} type="primary" htmlType="submit">
            Create
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" onClick={() => history.push('/admins')}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

CreateAdmin.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'create-admin' })(CreateAdmin);
