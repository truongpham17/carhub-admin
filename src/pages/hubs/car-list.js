import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import {
  Table,
  Divider,
  Typography,
  Button,
  message,
  Avatar,
  Input,
} from 'antd';
import './hubs.scss';

import Layout from '../../components/layout';

import { getHubDetail } from '../../redux/actions';

const { Title } = Typography;

function CarList() {
  // const hubs = useSelector(state => state.hubs.hubs);
  const [transfer, setTransfer] = useState(false);
  const dispatch = useDispatch();
  const { history } = useReactRouter();
  const carList = useSelector(state => state.hubs.selectedHub.cars);

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

  const columns = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Image',
      key: 'image',
      render: item => (
        <img src={item.image} alt="Car detail" width={100} height={64} />
      ),
    },

    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },

    {
      title: 'Current quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },

    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleViewPost(record.key)}>Detail</a>
          <Divider type="vertical" />
          <a>Remove</a>
          {/* <Divider type="vertical" />
          <a onClick={handleDeletePost(record.key)}>Delete</a>  */}
        </span>
      ),
    },
  ];

  const data = Array.isArray(carList)
    ? carList
        .filter(car => car.isActive)
        .map((car, index) => ({
          key: car._id,
          name: car.carModel.name,
          type: car.carModel.type,
          image: car.carModel.images[0],
          quantity: 10,
          no: index + 1,
        }))
    : null;

  return (
    <Layout>
      <Title>Cars</Title>
      {Array.isArray(data) && Array.isArray(carList) ? (
        <Table
          columns={
            transfer
              ? [
                  ...columns,
                  {
                    title: 'Transfer quantity',
                    key: 'confirm_quantity',
                    render: (text, record) => (
                      <Input
                        value={123}
                        onChange={d => console.log(d.nativeEvent)}
                      />
                    ),
                  },
                ]
              : columns
          }
          dataSource={data}
          bordered
          pagination={false}
        />
      ) : (
        <p>Loading car list</p>
      )}
      <br />

      <div className="button">
        {!transfer ? (
          <Button type="primary" onClick={() => setTransfer(true)}>
            Transfer
          </Button>
        ) : (
          <>
            <Button type="primary" style={{ marginRight: 16 }}>
              Confirm transfer
            </Button>
            <Button type="primary" onClick={() => setTransfer(false)}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}

export default CarList;
