import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography } from 'antd';

import Layout from '../../components/layout';
import { createCompany, getCompanies } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function CreateCompany({ form }) {
  // Form
  const { getFieldDecorator } = form;

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleCreateCompany(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { name, email } = values;

      if (!err) {
        const data =
          name && email
            ? {
                name,
                email,
              }
            : null;
        if (data)
          createCompany(dispatch)(data, {
            success: () => {
              getCompanies(dispatch);
              history.push(`/`);
            },
            failure: () => console.log('Create fail!'),
          });
      }
    });
  }

  const submitDisabled =
    !form.getFieldValue('name') ||
    !form.getFieldValue('email') ||
    (typeof form.getFieldValue('email') === 'string' &&
      form.getFieldValue('email').length > 120);

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Create Company</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleCreateCompany}>
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
        <Form.Item {...tailFormItemLayout}>
          <Button disabled={submitDisabled} type="primary" htmlType="submit">
            Create
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" onClick={() => history.push('/')}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

CreateCompany.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'create-company' })(CreateCompany);
