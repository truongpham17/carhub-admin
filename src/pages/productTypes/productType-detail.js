import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography } from 'antd';

import Layout from '../../components/layout';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function ProductTypeDetail({ match }) {
  const productType = useSelector(state =>
    Array.isArray(state.productTypes.list)
      ? state.productTypes.list.find(c => c._id === match.params.id)
      : null
  );
  const { history } = useReactRouter();

  const role =
    productType.role === 1
      ? 'Staff'
      : productType.role === 2
      ? 'Accountant'
      : productType.role === 3
      ? 'Manager'
      : '';

  return (
    <Layout>
      {productType ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Product Type Detail</Typography.Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            onSubmit={e => {
              e.preventDefault();
              history.goBack();
            }}
          >
            <Form.Item label="Product Type ID">
              <Input readOnly value={productType._id} />
            </Form.Item>
            <Form.Item label="Category ID">
              <Input readOnly value={productType.category} />
            </Form.Item>
            <Form.Item label="Username">
              <Input readOnly value={productType.username} />
            </Form.Item>
            <Form.Item label="Fullname">
              <Input readOnly value={productType.fullname} />
            </Form.Item>
            <Form.Item label="Email">
              <Input readOnly value={productType.email} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input readOnly value={productType.phone} />
            </Form.Item>
            <Form.Item label="Role" hasFeedback>
              <Input readOnly value={role} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Back
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        'Product type not found'
      )}
    </Layout>
  );
}

ProductTypeDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProductTypeDetail;
