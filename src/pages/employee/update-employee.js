import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  message,
  Menu,
  Dropdown,
} from 'antd';

import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import Layout from '../../components/layout';
import { createAdmin, getAdmins, updateEmployee } from '../../redux/actions';
import { formItemLayout, tailFormItemLayout } from '../../utils/constants';

function UpdateEmployee({ form }) {
  const { getFieldDecorator } = form;

  const selectedEmployee = useSelector(
    state => state.employees.selectedEmployee
  );
  const hubs = useSelector(state => state.hubs.hubs);

  const [selectedHub, setSelectedHub] = useState(selectedEmployee.hub || {});

  useEffect(() => {
    setTimeout(() => {
      selectedEmployee.dateOfBirth = moment(
        selectedEmployee.dateOfBirth
      ).format('DD-MM-YYYY');
      console.log({ selectedEmployee });
      form.setFieldsValue({ ...selectedEmployee });
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  function handleUpdateEmployee(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { fullName, email, phone, dateOfBirth } = values;
      const hub = selectedHub._id;
      if (!err) {
        const data = {
          fullName,
          email,
          phone,
          dateOfBirth,
          hub,
        };
        if (data)
          updateEmployee(dispatch)(
            { data, _id: selectedEmployee._id },
            {
              success() {
                history.push(`/employees`);
                message.success('Update employee successfully!');
              },
              failure() {
                message.error('Update employee unsuccessfully!');
              },
            }
          );
      }
    });
  }

  function onSelectHub(select) {
    const hub = hubs.find(item => item._id === select.key);
    setSelectedHub(hub);
  }

  const menu = (
    <Menu onClick={onSelectHub}>
      {hubs.map(hub => (
        <Menu.Item key={hub._id}>{hub.name}</Menu.Item>
      ))}
    </Menu>
  );

  const submitDisabled = false;
  return (
    <Layout>
      <Row>
        <Col sm={{ offset: 6 }} md={{ offset: 4 }}>
          <Typography.Title>Employee Detail</Typography.Title>
        </Col>
      </Row>
      <Form {...formItemLayout} onSubmit={handleUpdateEmployee}>
        <Form.Item label="Name">
          {getFieldDecorator('fullName', {
            rules: [
              {
                required: true,
                message: 'Please input name!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        {/* <Form.Item label="Avatar">
          {getFieldDecorator('avatar', {
            rules: [
              {
                required: true,
                message: 'Please input avatar!',
              },
            ],
          })(<Input />)}
        </Form.Item> */}
        <Form.Item label="Hub">
          (
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {selectedHub.name} <DownOutlined />
            </a>
          </Dropdown>
          )
        </Form.Item>

        <Form.Item label="Birthday">
          {getFieldDecorator('dateOfBirth', {
            rules: [
              {
                required: true,
                message: 'Please input birthday!',
              },
            ],
          })(<Input />)}
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
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input email!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button disabled={submitDisabled} type="primary" htmlType="submit">
            Save
          </Button>
          &nbsp; &nbsp;
          <Button type="primary" onClick={() => history.push('/employees')}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

UpdateEmployee.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({ name: 'create-admin' })(UpdateEmployee);
