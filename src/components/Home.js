import React, { useState } from "react";
import "./home.css";

import Form from "./Form/form";
import DisplayTable from "./Table/table";

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const dataForTable = (data) => {
    setTableData(data);
  };
  return (
    <div>
      <Form sendData={dataForTable} />
      <DisplayTable tableData={tableData} />
    </div>
  );
};

export default Home;
