import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { Table, Divider, Typography, Button, message } from 'antd';

import Layout from '../../components/layout';

import { getCategories, deleteCategory } from '../../redux/actions';

const { Title } = Typography;

function Categories() {
  const categories = useSelector(state => state.categories.list);
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getCategories(dispatch)({
      success: () => console.log('Load categories success!'),
      failure: e => console.log(`Load categories fail! Error: ${e}`),
    });
  }, [dispatch]);

  function handleUpdateCategory(id) {
    return function() {
      history.push(`/categories/${id}/update`);
    };
  }

  function handleDeleteCategory(id) {
    return function() {
      deleteCategory(dispatch)(id, {
        success: () => message.success('Delete category successfully!'),
        failure: () => message.error('Delete category unsuccessfully!'),
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
        <Link to={`/categories/${record.key}`}>{record.name}</Link>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={handleUpdateCategory(record.key)}>Update</a>
          <Divider type="vertical" />
          <a onClick={handleDeleteCategory(record.key)}>Delete</a>
        </span>
      ),
    },
  ];

  const data = Array.isArray(categories)
    ? categories.map((category, index) => ({
        key: category._id,
        name: category.name,
        no: index + 1,
      }))
    : null;

  return (
    <Layout>
      <Title>Categories</Title>
      {Array.isArray(data) && Array.isArray(categories) ? (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
        />
      ) : (
        <p>Loading categories</p>
      )}
      <br />
      <Button onClick={() => history.push('/categories/create-category')}>
        Create category
      </Button>
    </Layout>
  );
}

export default Categories;
