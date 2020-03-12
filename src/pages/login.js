import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

import { Form, Input, Button, Icon, message } from 'antd';
import { login } from '../redux/actions';

function LoginPage({ form }) {
  // Form
  const { getFieldDecorator } = form;

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function submitLogin(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { username, password } = values;
      login(dispatch)(
        { username: 'account1', password: '123456' },
        {
          success: () => {
            message.success('Login successfully!');
            history.push('/');
          },
          failure: () => message.error('Login unsuccessfully!'),
        }
      );
    });
  }

  const submitDisabled =
    !form.getFieldValue('username') || !form.getFieldValue('password');

  return (
    <div>
      <Form
        onSubmit={submitLogin}
        style={{
          maxWidth: 300,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #d9d9d9',
          // boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 4px',
          borderRadius: 3,
          padding: 30,
        }}
      >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input username!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input password!',
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            style={{ width: '100%' }}
            disabled={submitDisabled}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

LoginPage.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'form' })(LoginPage);
