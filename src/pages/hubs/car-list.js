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
  InputNumber,
  Tabs,
  Checkbox,
  Modal,
  Menu,
  Dropdown,
} from 'antd';
import './hubs.scss';

import { DownOutlined } from '@ant-design/icons';

import Layout from '../../components/layout';

import { transferCar, transferCarModel } from '../../redux/actions';

const { TabPane } = Tabs;

const { Title } = Typography;

function getCarList(cars = []) {
  const carModels = [];
  cars
    .filter(item => !item.customer)
    .forEach(car => {
      const duplicateCarModel = carModels.find(
        item => item._id === car.carModel._id
      );
      if (!duplicateCarModel) {
        carModels.push({ ...car.carModel, quantity: 1 });
      } else {
        duplicateCarModel.quantity += 1;
      }
    });
  return carModels;
}

function CarList() {
  // const hubs = useSelector(state => state.hubs.hubs);

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  const carList = useSelector(state => state.hubs.selectedHub.cars) || [];
  const currentHub = useSelector(state => state.hubs.selectedHub);
  const hubs = useSelector(state => state.hubs.hubs);
  const carModelList = getCarList(carList);

  const [loadingCarModel, setLoadingCarModel] = useState(false);
  const [loadingCar, setLoadingCar] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null);
  const [transfers, setTransfers] = useState(
    carModelList.map(carModel => ({ _id: carModel._id, quantity: 0 }))
  );
  const [leasingTransfer, setLeasingTransfer] = useState(
    carList.map(item => ({ _id: item._id, checked: false }))
  );

  function onChangeQuantity(record, quantity) {
    setTransfers(transfers =>
      transfers.map(item => {
        if (item._id === record.key) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      })
    );
  }

  function onChangeCheckBox(record, checked) {
    setLeasingTransfer(leasing =>
      leasing.map(item => {
        if (record.key === item._id) {
          return { ...item, checked };
        }
        return item;
      })
    );
  }

  function onSelectHub(select) {
    const hub = hubs.find(item => item._id === select.key);
    setSelectedHub(hub);
  }

  function onSubmitSuccess() {
    setLoadingCarModel(false);
    setModalVisible(false);
    setLoadingCar(false);
    history.push('/');
    message.success('Transfer car successfully!');
  }

  function onSubmitFailure() {
    setLoadingCarModel(false);
    setModalVisible(false);
    setLoadingCar(false);
    message.error('Failed to transfer car!');
  }

  function onSubmitTransfer() {
    if (!selectedHub) {
      message.error('Please choose hub destination!');
      return;
    }
    const transfersFilter = transfers.filter(item => item.quantity > 0);
    const leasingTransferFilter = leasingTransfer.filter(item => item.checked);
    if (transfersFilter.length > 0) {
      setLoadingCarModel(true);
      transferCarModel(dispatch)(
        {
          fromHub: currentHub._id,
          toHub: selectedHub._id,
          list: transfersFilter,
        },
        {
          success: onSubmitSuccess,
          failure: onSubmitFailure,
        }
      );
    }
    if (leasingTransferFilter.length > 0) {
      setLoadingCar(true);
      transferCar(dispatch)(
        {
          fromHub: currentHub._id,
          toHub: selectedHub._id,
          list: leasingTransferFilter,
        },
        {
          success: onSubmitSuccess,
          failure: onSubmitFailure,
        }
      );
    }
  }

  const data = Array.isArray(carModelList)
    ? carModelList
        .filter(carModel => carModel.isActive)
        .map((carModel, index) => ({
          key: carModel._id,
          name: carModel.name,
          type: carModel.type,
          image: carModel.images[0],
          quantity: carModel.quantity,
          no: index + 1,
        }))
    : null;

  const dataLeasing = Array.isArray(carList)
    ? carList
        .filter(car => car.customer)
        .map((car, index) => ({
          key: car._id,
          name: car.carModel.name,
          image: car.images[0],
          no: index + 1,
          customer: car.customer.fullName,
        }))
    : null;

  const menu = (
    <Menu onClick={onSelectHub}>
      {hubs.map(hub => (
        <Menu.Item key={hub._id}>{hub.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout>
      <Title>Cars</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Hub car" key="1">
          {Array.isArray(data) && Array.isArray(carModelList) ? (
            <Table
              columns={
                isTransfer
                  ? [
                      ...columns,
                      {
                        title: 'Transfer quantity',
                        key: 'confirm_quantity',
                        render: (text, record) => (
                          <InputNumber
                            value={
                              transfers.find(item => item._id === record.key)
                                .quantity
                            }
                            onChange={quantity =>
                              onChangeQuantity(record, quantity)
                            }
                            min={0}
                            max={record.quantity}
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
        </TabPane>
        <TabPane tab="Leasing car" key="2">
          <Table
            columns={
              isTransfer
                ? [
                    ...columnsLeasing,
                    {
                      title: 'Select',
                      key: 'selectTransfer',
                      render: (text, record) => (
                        <Checkbox
                          onChange={e =>
                            onChangeCheckBox(record, e.target.checked)
                          }
                        />
                      ),
                    },
                  ]
                : columnsLeasing
            }
            dataSource={dataLeasing}
            bordered
            pagination={false}
          />

          <br />
        </TabPane>
      </Tabs>

      <div className="button">
        {!isTransfer ? (
          <Button type="primary" onClick={() => setIsTransfer(true)}>
            Transfer
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              style={{ marginRight: 16 }}
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Confirm transfer
            </Button>
            <Button type="primary" onClick={() => setIsTransfer(false)}>
              Cancel
            </Button>
          </>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title="Select hub to transfer"
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loadingCar || loadingCarModel}
            onClick={() => onSubmitTransfer()}
          >
            Submit
          </Button>,
        ]}
      >
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {selectedHub ? selectedHub.name : 'Select hub'} <DownOutlined />
          </a>
        </Dropdown>
      </Modal>
    </Layout>
  );
}

export default CarList;

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
];

const columnsLeasing = [
  {
    title: 'STT',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Customer',
    key: 'customer',
    dataIndex: 'customer',
  },
  {
    title: 'Image',
    key: 'image',
    render: item => (
      <img src={item.image} alt="Car detail" width={100} height={64} />
    ),
  },

  {
    title: 'Car name',
    key: 'name',
    dataIndex: 'name',
  },
];
