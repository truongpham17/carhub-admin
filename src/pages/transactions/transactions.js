import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import {
  Table,
  Divider,
  Typography,
  Button,
  message,
  List,
  Avatar,
} from 'antd';
import dog from '../../dog/dog.jpg';

import Layout from '../../components/layout';

import { getTransactionList, deleteAdmin } from '../../redux/actions';

const { Title } = Typography;

function Transactions() {
  const dispatch = useDispatch();
  const transactions =
    useSelector(state => state.transactions.transactions) || [];
  useEffect(() => {
    getTransactionList(dispatch)({
      success: () => {
        message.success('Success');
      },
      failure() {
        message.error('Error');
      },
    });
  }, [dispatch]);

  function renderTransaction(transaction) {
    const { transactionType, value, employee, lease, rental } = transaction;
    if (transactionType === 'LEASE' && value === 'RETURN_CAR')
      return (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={employee.avatar} />}
            title="Confirm receive leasing car"
            description={`${employee.fullName} employee confirmed received ${lease.car.carModel.name} car from ${lease.customer.fullName}`}
          />
        </List.Item>
      );

    if (transactionType === 'RENTAL' && value === 'GET_CAR')
      return (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={rental.customer.avatar} />}
            title="Confirm taking rental car"
            description={`${rental.customer.fullName} confirmed taking a rental car - ${rental.carModel.name} - accepted by ${employee.fullName}`}
          />
        </List.Item>
      );
  }

  return (
    <Layout>
      <Title>Transactions</Title>
      {transactions.map(renderTransaction)}
    </Layout>
  );
}

export default Transactions;
