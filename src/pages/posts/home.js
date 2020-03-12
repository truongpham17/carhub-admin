import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { Table, Divider, Typography, Button, message } from 'antd';
import location from '../../assets/location.json';

import Layout from '../../components/layout';

import { getPosts, deletePost, updatePost } from '../../redux/actions';

const { Title } = Typography;

function HomePage() {
  // const posts = useSelector(state => state.posts.list);
  // const dispatch = useDispatch();
  // const { history } = useReactRouter();

  // useEffect(() => {
  //   getPosts(dispatch)({
  //     success: () => console.log('Load posts success!'),
  //     failure: e => console.log(`Load posts fail! Error: ${e}`),
  //   });
  // }, [dispatch]);

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

  // function handleViewPost(_id) {
  //   return function() {
  //     history.push(`/posts/${_id}`);
  //   };
  // }

  // const columns = [
  //   {
  //     title: 'STT',
  //     dataIndex: 'no',
  //     key: 'no',
  //   },
  //   {
  //     title: 'Product type',
  //     key: 'productType',
  //     dataIndex: 'productType',
  //   },
  //   {
  //     title: 'Unit price',
  //     key: 'price',
  //     dataIndex: 'price',
  //   },
  //   {
  //     title: 'Quantity',
  //     key: 'quantity',
  //     dataIndex: 'quantity',
  //   },
  //   {
  //     title: 'Seller',
  //     key: 'seller',
  //     dataIndex: 'seller',
  //     render: (text, record) => (
  //       <span>
  //         <a>{text}</a>
  //       </span>
  //     ),
  //   },
  //   {
  //     title: 'Phone',
  //     key: 'phone',
  //     dataIndex: 'phone',
  //   },
  //   {
  //     title: 'Address',
  //     key: 'address',
  //     dataIndex: 'address',
  //   },
  //   {
  //     title: '',
  //     key: 'action',
  //     render: (text, record) => (
  //       <span>
  //         <a onClick={handleViewPost(record.key)}>Detail</a>
  //         <Divider type="vertical" />
  //         <a onClick={handleApprovePost(record.key)}>Approve</a>
  //         <Divider type="vertical" />
  //         <a onClick={handleDeletePost(record.key)}>Delete</a>
  //       </span>
  //     ),
  //   },
  // ];

  // const data = Array.isArray(posts)
  //   ? posts
  //       .filter(post => !post.published)
  //       .map((post, index) => {
  //         const province = location.find(p => p.code === post.seller.province);
  //         const district = province.districts.find(
  //           d => d.code === post.seller.district
  //         );
  //         return {
  //           key: post._id,
  //           productType: post.productType.name,
  //           price: `${post.price.toLocaleString()} đồng/${post.unit}`,
  //           quantity: `${post.quantity} ${post.unit}`,
  //           seller: post.seller.name,
  //           phone: post.seller.phone,
  //           address: `${post.seller.address}, ${district.name_with_type}, ${province.name_with_type}`,
  //           no: index + 1,
  //         };
  //       })
  //   : null;

  // console.log(posts);

  // return (
  //   <Layout>
  //     <Title>Posts</Title>
  //     {Array.isArray(data) && Array.isArray(posts) ? (
  //       <Table
  //         columns={columns}
  //         dataSource={data}
  //         bordered
  //         pagination={false}
  //       />
  //     ) : (
  //       <p>Loading posts</p>
  //     )}
  //     <br />
  //   </Layout>
  // );
  return <p>Hello friend</p>;
}

export default HomePage;
