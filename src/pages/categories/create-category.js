import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import Layout from '../../components/layout';
import { createCategory, getCategories } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function CreateCategory({ form }) {
  // Form
  const { getFieldDecorator } = form;

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleCreateCategory(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { name } = values;

      if (!err) {
        const data = name
          ? {
              name,
              image:
                'https://i.kinja-img.com/gawker-media/image/upload/s--VnHHW5rs--/c_scale,f_auto,fl_progressive,q_80,w_800/qq8gdnv6l17trcmdnwn5.jpg',
            }
          : null;
        if (data)
          createCategory(dispatch)(data, {
            success: () => {
              getCategories(dispatch);
              history.push(`/categories`);
              message.success('Create category successfully!');
            },
            failure: () => message.error('Create category unsuccessfully!'),
          });
      }
    });
  }

  const submitDisabled = !form.getFieldValue('name');

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Create Category</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleCreateCategory}>
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

CreateCategory.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'create-category' })(CreateCategory);
