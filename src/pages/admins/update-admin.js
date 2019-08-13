import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import Layout from '../../components/layout';
import { updateAdmin, getAdmins } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function UpdateAdmin({ match, form }) {
  // Form
  const { getFieldDecorator } = form;

  const admin = useSelector(state =>
    Array.isArray(state.admins.list)
      ? state.admins.list.find(c => c._id === match.params.id)
      : null
  );
  const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateAdmin(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { name, phone, password, confirm } = values;

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
          updateAdmin(dispatch)(match.params.id, data, {
            success: () => {
              getAdmins(dispatch);
              history.push(`/admins`);
              message.success('Update admin successfully!');
            },
            failure: () => message.error('Update admin unsuccessfully!'),
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
  // (form.getFieldValue('password') &&
  //   (!form.getFieldValue('password') ||
  //     (typeof form.getFieldValue('password') === 'string' &&
  //       (form.getFieldValue('password').length < 6 ||
  //         form.getFieldValue('password').length > 120)) ||
  //     !form.getFieldValue('confirm') ||
  //     (typeof form.getFieldValue('confirm') === 'string' &&
  //       (form.getFieldValue('confirm').length < 6 ||
  //         form.getFieldValue('confirm').length > 120)) ||
  //     form.getFieldValue('password') !== form.getFieldValue('confirm')));

  return (
    <Layout>
      {admin ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Update Admin</Typography.Title>
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

UpdateAdmin.propTypes = {
  match: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'update-admin' })(UpdateAdmin);
