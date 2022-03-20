import React from "react";
import Table from "react-bootstrap/Table";

const DisplayTable = ({ tableData }) => {
  return (
    <div>
      <Table striped bordered hover style={{width:"90vw",minHeight:"30vh"}}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((data) => {
              return (
                <tr>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.company}</td>
                  <td>{data.address}</td>
                  <td><input type="checkbox"></input></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayTable;
