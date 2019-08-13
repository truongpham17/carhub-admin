import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

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
      const { name, email, phone, password, confirm } = values;

      if (!err) {
        const data =
          password === confirm
            ? {
                password,
                name,
                email,
                phone,
              }
            : null;
        if (data)
          createAdmin(dispatch)(data, {
            success: () => {
              getAdmins(dispatch);
              history.push(`/admins`);
              message.success('Create admin successfully!');
            },
            failure: () => message.error('Create admin unsuccessfully!'),
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

  const submitDisabled = false;
  // !form.getFieldValue('name') ||
  // (typeof form.getFieldValue('name') === 'string' &&
  //   (form.getFieldValue('name').length < 3 ||
  //     form.getFieldValue('name').length > 80)) ||
  // !form.getFieldValue('email') ||
  // (typeof form.getFieldValue('email') === 'string' &&
  //   form.getFieldValue('email').length > 120) ||
  // !form.getFieldValue('phone') ||
  // (typeof form.getFieldValue('phone') === 'string' &&
  //   form.getFieldValue('phone').length !== 10) ||
  // !form.getFieldValue('password') ||
  // (typeof form.getFieldValue('password') === 'string' &&
  //   (form.getFieldValue('password').length < 6 ||
  //     form.getFieldValue('password').length > 120)) ||
  // !form.getFieldValue('confirm') ||
  // (typeof form.getFieldValue('confirm') === 'string' &&
  //   (form.getFieldValue('confirm').length < 6 ||
  //     form.getFieldValue('confirm').length > 120)) ||
  // form.getFieldValue('password') !== form.getFieldValue('confirm');

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Create Admin</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleCreateAdmin}>
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
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input name!',
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
