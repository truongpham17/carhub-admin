import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import {
  Row,
  Col,
  Form,
  Input,
  Table,
  Divider,
  Typography,
  Button,
  message,
} from 'antd';

import { getProductTypes, deleteProductType } from '../../redux/actions';
import Layout from '../../components/layout';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function CategoryDetail({ match }) {
  const category = useSelector(state =>
    Array.isArray(state.categories.list)
      ? state.categories.list.find(c => c._id === match.params.id)
      : null
  );
  const allProductTypes = useSelector(state => state.productTypes.list);
  const productTypes =
    Array.isArray(allProductTypes) && category
      ? allProductTypes.filter(
          productType => productType.category === category._id
        )
      : null;
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getProductTypes(dispatch)({
      success: () => console.log('Load productTypes success!'),
      failure: e => console.log(`Load productTypes fail! Error: ${e}`),
    });
  }, [dispatch]);

  function handleDeleteProductType(id) {
    return function() {
      deleteProductType(dispatch)(id, {
        success: () => message.success('Delete product type successfully!'),
        failure: () => message.error('Delete product type unsuccessfully!'),
      });
    };
  }

  function handleUpdateProductType(id) {
    return function() {
      history.push(`/productTypes/${id}/update`);
    };
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleUpdateProductType(record.key)}>Update</a>
          <Divider type="vertical" />
          <a onClick={handleDeleteProductType(record.key)}>Delete</a>
        </span>
      ),
    },
  ];

  const data = Array.isArray(productTypes)
    ? productTypes.map((productType, index) => ({
        key: productType._id,
        name: productType.name,
        no: index + 1,
      }))
    : null;

  return (
    <Layout>
      {category ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Category Detail</Typography.Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            onSubmit={e => {
              e.preventDefault();
              history.push('/categories');
            }}
          >
            <Form.Item label="Category ID">
              <Input readOnly value={category._id} />
            </Form.Item>
            <Form.Item label="Name">
              <Input readOnly value={category.name} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Back
              </Button>
            </Form.Item>
          </Form>
          <br />
          {Array.isArray(data) && Array.isArray(productTypes) ? (
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={false}
            />
          ) : (
            <p>Loading product types</p>
          )}
          <br />
          <Button
            onClick={() =>
              history.push(`/categories/${match.params.id}/create-productType`)
            }
          >
            Create product type
          </Button>
        </>
      ) : (
        <p>Category not found</p>
      )}
    </Layout>
  );
}

CategoryDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CategoryDetail;
