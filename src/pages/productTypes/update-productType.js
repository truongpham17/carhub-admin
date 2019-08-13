import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Typography,
  message,
} from 'antd';

import Layout from '../../components/layout';
import { updateProductType, getProductTypes } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function UpdateProductType({ match, form }) {
  // Form
  const { getFieldDecorator } = form;

  const productType = useSelector(state =>
    Array.isArray(state.productTypes.list)
      ? state.productTypes.list.find(c => c._id === match.params.id)
      : null
  );
  const [confirmDirty, setConfirmDirty] = useState(false);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateProductType(e) {
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
          updateProductType(dispatch)(match.params.id, data, {
            success: () => {
              getProductTypes(dispatch);
              history.push(`/categories/${productType.category}`);
              message.success('Update productType successfully!');
            },
            failure: () => message.error('Update productType unsuccessfully!'),
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
          <Typography.Title>Update Product Type</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleUpdateProductType}>
        <Form.Item label="Category ID">
          {getFieldDecorator('categoryID', {
            initialValue: productType.category,
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
            initialValue: productType.name,
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
          <Button type="primary" onClick={() => history.goBack()}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

UpdateProductType.propTypes = {
  match: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'update-productType' })(UpdateProductType);
