import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { Table, Divider, Typography, Button, message } from 'antd';
import './hubs.scss';

import Layout from '../../components/layout';

import { getHubList, getHubDetail } from '../../redux/actions';

const { Title } = Typography;

function HubList() {
  const hubs = useSelector(state => state.hubs.hubs);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getHubList(dispatch)({
      success: () => console.log('Load hubs success!'),
      failure: e => console.log(`Load hubs fail! Error: ${e}`),
    });
  }, [dispatch]);

  // function handleDeletePost(id) {
  //   return function() {
  //     deletePost(dispatch)(id, {
  //       success: () => message.success('Delete post successfully!'),
  //       failure: () => message.error('Delete post unsuccessfully!'),
  //     });
  //   };
  // }

  // function handleApprovePost(id) {
  //   return function() {
  //     updatePost(dispatch)(
  //       id,
  //       { published: true },
  //       {
  //         success: () => message.success('Delete post successfully!'),
  //         failure: () => message.error('Delete post unsuccessfully!'),
  //       }
  //     );
  //   };
  // }

  function handleViewPost(_id) {
    return function() {
      getHubDetail(dispatch)(_id, {
        success: () => {
          history.push(`/hubs/${_id}`);
        },
        failure: error => {
          console.log(error);
          message.error('Fail to load hub');
        },
      });
    };
  }

  function handleViewCarList(_id) {
    return function() {
      getHubDetail(dispatch)(_id, {
        success: () => {
          history.push('/hubs/cars');
        },
        failure: error => {
          console.log(error);
          message.error('Fail to load hub');
        },
      });
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
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Address',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleViewPost(record.key)}>Edit</a>
          <Divider type="vertical" />
          <a>Remove</a>
          {/* <Divider type="vertical" />
          <a onClick={handleDeletePost(record.key)}>Delete</a>  */}
          <Divider type="vertical" />
          <a onClick={handleViewCarList(record.key)}>Car List</a>
        </span>
      ),
    },
  ];

  const data = Array.isArray(hubs)
    ? hubs
        .filter(hub => hub.isActive)
        .map((hub, index) => ({
          key: hub._id,
          name: hub.name,
          address: hub.address,
          phone: hub.phone,
          description: hub.description,
          no: index + 1,
        }))
    : null;

  return (
    <Layout>
      <Title>Hubs</Title>
      {Array.isArray(data) && Array.isArray(hubs) ? (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      ) : (
        <p>Loading hubs</p>
      )}
      <br />

      <div className="button" onClick={() => history.push('/create-hub')}>
        <Button>Create hub</Button>
      </div>
    </Layout>
  );
}

export default HubList;
