import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';

import { getEmployees, deleteEmployee } from '../redux/actions';
import Layout from '../components/layout';

function CompanyDetail({ match }) {
  const company = useSelector(state =>
    Array.isArray(state.companies.list)
      ? state.companies.list.find(c => c._id === match.params.id)
      : null
  );
  const employees = useSelector(state => state.employees.list).filter(
    employee => employee.company === company._id
  );
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  useEffect(() => {
    getEmployees(dispatch)({
      success: () => console.log('Load employees success!'),
      failure: e => console.log(`Load employees fail! Error: ${e}`),
    });
  }, [dispatch]);

  function handleDeleteEmployee(index) {
    return function() {
      deleteEmployee(dispatch)(
        {
          id: employees[index]._id,
        },
        {
          success: () => console.log('Delete employee success!'),
          failure: e => console.log(`Delete employee fail! Error: ${e}`),
        }
      );
    };
  }

  return (
    <Layout>
      <h1>Company Detail</h1>
      {company ? (
        <>
          ID: {company._id}
          <br />
          Name: {company.name}
          <br />
          Email: {company.email}
          <br />
          <br />
          {Array.isArray(employees) ? (
            <table border={1}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Username</th>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/employees/${employee._id}`}>
                        {employee.username}
                      </Link>
                    </td>
                    <td>{employee.fullname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.role}</td>
                    <td>
                      <button type="button">Update</button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={handleDeleteEmployee(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Employees not found</p>
          )}
          <br />
          <button
            type="button"
            onClick={() =>
              history.push(`/companies/${match.params.id}/create-employee`)
            }
          >
            Create employee
          </button>
        </>
      ) : (
        <p>Company not found</p>
      )}
    </Layout>
  );
}

CompanyDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CompanyDetail;
