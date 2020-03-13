import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import Layout from '../../components/layout';
import { createAdmin, getAdmins } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function UpdateEmployee({ form }) {
  const employee = useSelector(state =>
    state.employees.employees.find(
      record => record._id === '5e68b423eb1dcca53961be91'
    )
  );
  const { getFieldDecorator } = form;

  const [confirmDirty, setConfirmDirty] = useState(false);

  useEffect(() => {
    console.log('employee', employee);
    form.setFieldsValue({
      ...employee,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateEmployee(e) {
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

  const submitDisabled = false;
  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Create Admin</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleUpdateEmployee}>
        <Form.Item label="Name">
          {getFieldDecorator('fullName', {
            rules: [
              {
                required: true,
                message: 'Please input name!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Avatar">
          {getFieldDecorator('avatar', {
            rules: [
              {
                required: true,
                message: 'Please input avatar!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Hub">
          {getFieldDecorator('hub', {
            rules: [
              {
                required: true,
                message: 'Please input hub!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Birthday">
          {getFieldDecorator('birthday', {
            rules: [
              {
                required: true,
                message: 'Please input birthday!',
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
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input email!',
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

UpdateEmployee.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'create-admin' })(UpdateEmployee);
