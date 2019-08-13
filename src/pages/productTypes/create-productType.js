import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Select,
  message,
} from 'antd';

import Layout from '../../components/layout';
import { createProductType, getProductTypes } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function CreateProductType({ match, form }) {
  // Form
  const { getFieldDecorator } = form;

  const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleCreateProductType(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { categoryID, name } = values;

      if (!err) {
        const data = name
          ? {
              name,
              category: categoryID,
              image:
                'http://cahoangde.com/wp-content/uploads/2017/12/ca-hoi-9-600x400.jpg',
            }
          : null;

        if (data)
          createProductType(dispatch)(data, {
            success: () => {
              getProductTypes(dispatch);
              history.push(`/categories/${match.params.id}`);
              message.success('Create product type successfully!');
            },
            failure: () => message.error('Create product type unsuccessfully!'),
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
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Create Product Type</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleCreateProductType}>
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
          <Button
            type="primary"
            onClick={() => history.push(`/categories/${match.params.id}`)}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

CreateProductType.propTypes = {
  match: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'create-productType' })(CreateProductType);
