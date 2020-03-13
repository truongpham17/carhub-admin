import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Layout from '../../components/layout';
import LocationSearchInput from '../../components/location-search';
import { createHub, getAdmins } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function CreateHub({ form }) {
  // Form
  const { getFieldDecorator } = form;
  const [geometry, setGeometry] = useState(null);

  // const [confirmDirty, setConfirmDirty] = useState(false);

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function clearAddress() {
    form.setFieldsValue({
      address: '',
    });
  }

  function handleAddressChange() {}

  function handleAddressSelect(address, placeID) {
    form.setFieldsValue({ address });
    geocodeByAddress(address)
      .then(async results =>
        // Do something with results[0]
        getLatLng(results[0])
      )
      .then(geometry => {
        setGeometry(geometry);
        // Do something with latLng
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  function handleCreateHub(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        createHub(dispatch)(
          { ...values, geometry },
          {
            success: () => {
              // getAdmins(dispatch);
              history.push(`/`);
              message.success('Create hub successfully!');
            },
            failure: () => message.error('Create hub failure!'),
          }
        );
      }
    });
  }

  // const handleConfirmBlur = e => {
  //   const { value } = e.target;
  //   setConfirmDirty(confirmDirty || !!value);
  // };

  const submitDisabled = false;

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Create Hub</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleCreateHub}>
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

        <Form.Item label="Address">
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Please input phone!',
              },
            ],
          })(
            <LocationSearchInput
              address={form.getFieldValue('address')}
              clearAddress={clearAddress}
              onChange={handleAddressChange}
              onAddressSelect={handleAddressSelect}
            />
          )}
        </Form.Item>

        <Form.Item label="Phone">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Please input phone!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please input description!',
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

CreateHub.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'create-hub' })(CreateHub);
