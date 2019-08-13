import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
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
import location from '../../assets/location.json';

import Layout from '../../components/layout';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function PostDetail({ match }) {
  const post = useSelector(state =>
    Array.isArray(state.posts.list)
      ? state.posts.list.find(c => c._id === match.params.id)
      : null
  );
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  const province = location.find(p => p.code === post.seller.province);
  const district = province.districts.find(
    d => d.code === post.seller.district
  );

  return (
    <Layout>
      {post ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Post Detail</Typography.Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            onSubmit={e => {
              e.preventDefault();
              history.push('/');
            }}
          >
            <Form.Item label="Post ID">
              <Input readOnly value={post._id} />
            </Form.Item>
            <Form.Item label="Type">
              <Input readOnly value={post.productType.name} />
            </Form.Item>
            <Form.Item label="Unit price">
              <Input readOnly value={`${post.price} đ/${post.unit}`} />
            </Form.Item>
            <Form.Item label="Quantity">
              <Input readOnly value={`${post.quantity} ${post.unit}`} />
            </Form.Item>
            <Form.Item label="Description">
              <Input readOnly value={post.description} />
            </Form.Item>
            <Form.Item label="Seller">
              <Input readOnly value={post.seller.name} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input readOnly value={post.seller.phone} />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                readOnly
                value={`${post.seller.address}, ${district.name_with_type}, ${province.name_with_type}`}
              />
            </Form.Item>

            <Form.Item label="Images">
              {post.images.length > 0 ? (
                <>
                  {post.images.map(url => (
                    <img
                      widtd={100}
                      height={100}
                      style={{
                        marginRight: 12,
                        marginBottom: 12,
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 3,
                        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.5)',
                      }}
                      src={post.images[0]}
                      alt="hinh"
                    ></img>
                  ))}
                </>
              ) : (
                <span>None</span>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Back
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </Layout>
  );
}

PostDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostDetail;
