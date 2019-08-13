import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import Layout from '../components/layout';
import { updateAdmin, getAdmins } from '../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../utils/constants';

function Profile({ form }) {
  // Form
  const { getFieldDecorator } = form;

  const id = useSelector(state => state.admins.info.admin._id);
  const admin = useSelector(state =>
    Array.isArray(state.admins.list)
      ? state.admins.list.find(c => c._id === id)
      : null
  );
  const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateAdmin(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { username, name, email, phone, password, confirm } = values;

      if (!err) {
        const data =
          !password && !confirm
            ? {
                name,
                phone,
              }
            : password === confirm
            ? {
                password,
                name,
                phone,
              }
            : null;
        if (data)
          updateAdmin(dispatch)(id, data, {
            success: () => {
              getAdmins(dispatch);
              history.push('/');
              message.success('Update profile successfully!');
            },
            failure: () => message.error('Update profile unsuccessfully!'),
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

  return (
    <Layout>
      {admin ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Update Profile</Typography.Title>
            </Col>
          </Row>
          <Form {...formItemLayout} onSubmit={handleUpdateAdmin}>
            <Form.Item label="Admin ID">
              {getFieldDecorator('adminID', {
                initialValue: admin._id,
                rules: [
                  {
                    required: true,
                    message: 'Please input admin ID!',
                  },
                ],
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                initialValue: admin.email,
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
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                initialValue: admin.name,
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
                initialValue: admin.phone,
                rules: [
                  {
                    required: true,
                    message: 'Please input phone!',
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
              <Button
                disabled={submitDisabled}
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
              &nbsp; &nbsp;
              <Button type="primary" onClick={() => history.push('/admins')}>
                Back
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        'Admin not found'
      )}
    </Layout>
  );
}

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'update-profile' })(Profile);
