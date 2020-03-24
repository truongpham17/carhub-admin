import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Layout from '../../components/layout';
import LocationSearchInput from '../../components/location-search';
import { createHub, updateHub } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function HubDetail({ form }) {
  // Form
  const { getFieldDecorator } = form;
  const [geometry, setGeometry] = useState(null);

  const selectedHub = useSelector(state => state.hubs.selectedHub);

  useEffect(() => {
    setTimeout(() => {
      form.setFieldsValue({ ...selectedHub });
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function clearAddress() {
    form.setFieldsValue({
      address: '',
    });
  }

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

  function handleUpdateHub(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        updateHub(dispatch)(
          {
            _id: selectedHub._id,
            data: {
              ...values,
              geometry: geometry || selectedHub.geometry,
            },
          },
          {
            success: () => {
              // getAdmins(dispatch);
              history.push(`/`);
              message.success('Update hub successfully!');
            },
            failure: () => message.error('Update hub failure!'),
          }
        );
      }
    });
  }

  const submitDisabled = false;

  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Hub Detail</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleUpdateHub}>
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
              onChange={() => {}}
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
            Save changes
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

HubDetail.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'hub-detail' })(HubDetail);
