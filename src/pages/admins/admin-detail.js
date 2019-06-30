import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography } from 'antd';

import Layout from '../../components/layout';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function AdminDetail({ match }) {
  const admin = useSelector(state =>
    Array.isArray(state.admins.list)
      ? state.admins.list.find(c => c._id === match.params.id)
      : null
  );
  const { history } = useReactRouter();

  return (
    <Layout>
      {admin ? (
        <>
          <Row>
            <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
              <Typography.Title>Admin Detail</Typography.Title>
            </Col>
          </Row>
          <Form
            {...formItemLayout}
            onSubmit={e => {
              e.preventDefault();
              history.push('/admins');
            }}
          >
            <Form.Item label="Admin ID">
              <Input readOnly value={admin._id} />
            </Form.Item>
            <Form.Item label="Username">
              <Input readOnly value={admin.username} />
            </Form.Item>
            <Form.Item label="Fullname">
              <Input readOnly value={admin.fullname} />
            </Form.Item>
            <Form.Item label="Email">
              <Input readOnly value={admin.email} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input readOnly value={admin.phone} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Back
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        'Employee not found'
      )}
    </Layout>
  );
}

AdminDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AdminDetail;
