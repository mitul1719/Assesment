import React from "react";
import Table from "react-bootstrap/Table";

const DisplayTable = ({ tableData }) => {
  const isBrowser = typeof window !== "undefined";

  function handleCheck(e, index) {
    if (isBrowser) {
      const rowData = document
        .getElementById(`table_${index}`)
        .getElementsByTagName("td");
      let str = "";
      for (let i of [...rowData].slice(0, rowData.length - 1)) {
        str += i.innerHTML + "\n";
      }
      alert(str);
    }
  }
  return (
    <div>
      <Table
        striped
        bordered
        hover
        style={{ width: "90vw", minHeight: "30vh" }}
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((data, index) => {
              return (
                <tr
                  id={`table_${index}`}
                  key={`_${Object.keys(tableData)[index]}`}
                >
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.company}</td>
                  <td>{data.address}</td>
                  <td>{data.city}</td>
                  <td>{data.state}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleCheck(e, index)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayTable;
