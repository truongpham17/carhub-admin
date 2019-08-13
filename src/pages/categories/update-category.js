import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import Layout from '../../components/layout';
import { updateCategory, getCategories } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function UpdateCategory({ match, form }) {
  // Form
  const { getFieldDecorator } = form;

  const category = useSelector(state =>
    Array.isArray(state.categories.list)
      ? state.categories.list.find(c => c._id === match.params.id)
      : null
  );
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateCategory(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { name } = values;

      if (!err) {
        const data = name
          ? {
              name,
            }
          : null;
        if (data)
          updateCategory(dispatch)(match.params.id, data, {
            success: () => {
              getCategories(dispatch);
              history.push(`/categories`);
              message.success('Update category successfully!');
            },
            failure: () => message.error('Update category unsuccessfully!'),
          });
      }
    });
  }

  const submitDisabled = !form.getFieldValue('name');

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Update Category</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleUpdateCategory}>
        <Form.Item label="Category ID">
          {getFieldDecorator('categoryID', {
            initialValue: match.params.id,
            rules: [
              {
                required: true,
                message: 'Please input category ID!',
              },
            ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: category.name,
            rules: [
              {
                required: true,
                message: 'Please input name!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button disabled={submitDisabled} type="primary" htmlType="submit">
            Update
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" onClick={() => history.push('/categories')}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

UpdateCategory.propTypes = {
  match: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'update-category' })(UpdateCategory);
