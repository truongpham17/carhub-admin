import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { Table, Divider, Typography, Button, message } from 'antd';

import Layout from '../../components/layout';

import { getCompanies, deleteCompany } from '../../redux/actions';

const { Title } = Typography;

function HomePage() {
  const companies = useSelector(state => state.companies.list);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getCompanies(dispatch)({
      success: () => console.log('Load companies success!'),
      failure: e => console.log(`Load companies fail! Error: ${e}`),
    });
  }, [dispatch]);

  function handleUpdateCompany(id) {
    return function() {
      history.push(`/companies/${id}/update`);
    };
  }

  function handleDeleteCompany(id) {
    return function() {
      deleteCompany(dispatch)(id, {
        success: () => message.success('Delete company successfully!'),
        failure: () => message.error('Delete company unsuccessfully!'),
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
      render: (text, record) => (
        <Link to={`/companies/${record.key}`}>{record.name}</Link>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleUpdateCompany(record.key)}>Update</a>
          <Divider type="vertical" />
          <a onClick={handleDeleteCompany(record.key)}>Delete</a>
        </span>
      ),
    },
  ];

  const data = Array.isArray(companies)
    ? companies.map((company, index) => ({
        key: company._id,
        name: company.name,
        email: company.email,
        no: index + 1,
      }))
    : null;

  return (
    <Layout>
      <Title>Companies</Title>
      {Array.isArray(data) && Array.isArray(companies) ? (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      ) : (
        <p>Loading companies</p>
      )}
      <br />
      <Button onClick={() => history.push('/companies/create-company')}>
        Create company
      </Button>
    </Layout>
  );
}

export default HomePage;
