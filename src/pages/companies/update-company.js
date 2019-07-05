import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import Layout from '../../components/layout';
import { updateCompany, getCompanies } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function UpdateCompany({ match, form }) {
  // Form
  const { getFieldDecorator } = form;

  const company = useSelector(state =>
    Array.isArray(state.companies.list)
      ? state.companies.list.find(c => c._id === match.params.id)
      : null
  );
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateCompany(e) {
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
          updateCompany(dispatch)(match.params.id, data, {
            success: () => {
              getCompanies(dispatch);
              history.push(`/`);
              message.success('Update company successfully!');
            },
            failure: () => message.error('Update company unsuccessfully!'),
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
          <Typography.Title>Update Company</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleUpdateCompany}>
        <Form.Item label="Company ID">
          {getFieldDecorator('companyID', {
            initialValue: match.params.id,
            rules: [
              {
                required: true,
                message: 'Please input company ID!',
              },
            ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: company.name,
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
            initialValue: company.email,
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
            Update
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

UpdateCompany.propTypes = {
  match: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'update-company' })(UpdateCompany);
