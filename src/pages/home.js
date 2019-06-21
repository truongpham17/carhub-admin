import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';

import Layout from '../components/layout';

import { getCompanies, deleteCompany } from '../redux/actions';

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

  function handleEditCompany(index) {
    return function() {};
  }

  function handleDeleteCompany(index) {
    return function() {
      deleteCompany(dispatch)(
        {
          id: companies[index]._id,
        },
        {
          success: () => console.log('Delete company success!'),
          failure: e => console.log(`Delete company fail! Error: ${e}`),
        }
      );
    };
  }

  return (
    <Layout>
      <h1>Companies</h1>
      {Array.isArray(companies) ? (
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/companies/${company._id}`}>{company.name}</Link>
                </td>
                <td>
                  <button type="button">Update</button>
                </td>
                <td>
                  <button type="button" onClick={handleDeleteCompany(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading companies</p>
      )}
      <br />
      <button type="button" onClick={() => history.push('/create-company')}>
        Create company
      </button>
    </Layout>
  );
}

export default HomePage;
