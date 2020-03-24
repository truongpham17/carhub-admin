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
  Input,
} from 'antd';
import './hubs.scss';

import { DownOutlined } from '@ant-design/icons';

import Layout from '../../components/layout';

import { transferCar } from '../../redux/actions';

const { TabPane } = Tabs;

const { Title } = Typography;

const { Search } = Input;

function CarList() {
  // const hubs = useSelector(state => state.hubs.hubs);

  const dispatch = useDispatch();
  const { history } = useReactRouter();

  const carList = useSelector(state => state.hubs.selectedHub.cars) || [];
  const currentHub = useSelector(state => state.hubs.selectedHub);
  const hubs = useSelector(state => state.hubs.hubs);

  const [loadingHubCar, setLoadingHubCar] = useState(false);
  const [loadingLeasingCar, setLoadingLeasingCar] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hubTransfers, setHubTransfers] = useState(
    carList.map(item => ({ _id: item._id, checked: false }))
  );
  const [leasingTransfer, setLeasingTransfer] = useState(
    carList.map(item => ({ _id: item._id, checked: false }))
  );

  function onTransfer(record, checked) {
    setHubTransfers(transfer =>
      transfer.map(item => {
        if (record.key === item._id) {
          return { ...item, checked };
        }
        return item;
      })
    );
  }

  function onLeasingTransfer(record, checked) {
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
    setLoadingHubCar(false);
    setModalVisible(false);
    setLoadingLeasingCar(false);
    history.push('/');
    message.success('Transfer car successfully!');
  }

  function onSubmitFailure() {
    setLoadingHubCar(false);
    setModalVisible(false);
    setLoadingLeasingCar(false);
    message.error('Failed to transfer car!');
  }

  function onSubmitTransfer() {
    if (!selectedHub) {
      message.error('Please choose hub destination!');
      return;
    }
    const HubTransfersFilter = hubTransfers.filter(item => item.checked);
    const leasingTransferFilter = leasingTransfer.filter(item => item.checked);
    if (HubTransfersFilter.length > 0) {
      setLoadingHubCar(true);
      transferCar(dispatch)(
        {
          fromHub: currentHub,
          toHub: selectedHub,
          list: HubTransfersFilter,
        },
        {
          success: onSubmitSuccess,
          failure: onSubmitFailure,
        }
      );
    }
    if (leasingTransferFilter.length > 0) {
      setLoadingLeasingCar(true);
      transferCar(dispatch)(
        {
          fromHub: currentHub,
          toHub: selectedHub,
          list: leasingTransferFilter,
        },
        {
          success: onSubmitSuccess,
          failure: onSubmitFailure,
        }
      );
    }
  }

  const data = Array.isArray(carList)
    ? carList
        .filter(car => car.isActive && !car.customer)
        .map((car, index) => ({
          key: car._id,
          name: car.carModel.name,
          licensePlates: car.licensePlates,
          vin: car.VIN,
          note: car.note,
          no: index + 1,
        }))
    : null;

  const dataLeasing = Array.isArray(carList)
    ? carList
        .filter(car => car.customer)
        .map((car, index) => ({
          key: car._id,
          name: car.carModel.name,
          licensePlates: car.licensePlates,
          customer: car.customer.fullName,
          phone: car.customer.phone,
          vin: car.VIN,
          note: car.note,
          no: index + 1,
        }))
    : null;

  const menu = (
    <Menu onClick={onSelectHub}>
      {hubs.map(hub => (
        <Menu.Item key={hub._id}>{hub.name}</Menu.Item>
      ))}
    </Menu>
  );

  const filteredHubCar = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeaseCar = dataLeasing.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchUpdated = term => {
    setSearchTerm(term);
  };

  return (
    <Layout>
      <Title>{currentHub.name}</Title>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        style={{ width: 400 }}
        onChange={term => searchUpdated(term.currentTarget.value)}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Hub car" key="1">
          {Array.isArray(data) && Array.isArray(carList) ? (
            <Table
              columns={
                isTransfer
                  ? [
                      ...columns,
                      {
                        title: 'Select',
                        key: 'selectTransfer',
                        render: (text, record) => (
                          // <InputNumber
                          //   value={
                          //     transfers.find(item => item._id === record.key)
                          //       .quantity
                          //   }
                          //   onChange={quantity =>
                          //     onChangeQuantity(record, quantity)
                          //   }
                          //   min={0}
                          //   max={record.quantity}
                          // />
                          <Checkbox
                            onChange={e => onTransfer(record, e.target.checked)}
                          />
                        ),
                      },
                    ]
                  : columns
              }
              dataSource={filteredHubCar}
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
                            onLeasingTransfer(record, e.target.checked)
                          }
                        />
                      ),
                    },
                  ]
                : columnsLeasing
            }
            dataSource={filteredLeaseCar}
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
            loading={loadingLeasingCar || loadingHubCar}
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
    title: 'License Plates',
    key: 'licensePlates',
    dataIndex: 'licensePlates',
  },
  {
    title: 'VIN',
    key: 'vin',
    dataIndex: 'vin',
  },
  {
    title: 'Description',
    key: 'note',
    dataIndex: 'note',
  },
];

const columnsLeasing = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Car name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'License Plates',
    key: 'licensePlates',
    dataIndex: 'licensePlates',
  },
  {
    title: 'Customer',
    key: 'customer',
    dataIndex: 'customer',
  },
  {
    title: 'Phone',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: 'Description',
    key: 'note',
    dataIndex: 'note',
  },
];
