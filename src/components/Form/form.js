import React, { useEffect, useState } from "react";
import "./form.css";
import { ExportToCsv } from "export-to-csv";
import Table from "react-bootstrap/Table";

const Form = ({ sendData }) => {
  const [data, setData] = useState([]);
  const [inputID] = useState([
    "fname",
    "lname",
    "email",
    "address",
    "company",
    "password",
    "c_password",
    "city",
    "state",
  ]);

  const [showTable, setShowTable] = useState(false);

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "My Awesome CSV",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);

  /**
   * Exports table data to csv
   * @param {*} data
   */
  const exportToCsv = (data) => {
    csvExporter.generateCsv(data);
  };

  /**
   * Saves the data for table display
   * @param {*} formValues
   * @returns
   */
  const saveData = (formValues) => {
    formValues.preventDefault();

    //Confirm Password First
    const [password, confirmPasssword] = [
      formValues.target.password.value,
      formValues.target.c_password.value,
    ];

    if (password !== confirmPasssword) {
      alert("Passwords Don't match");
      return;
    }
    const [email, firstName, lastName, company, address, city, state] = [
      formValues.target.email.value,
      formValues.target.fname.value,
      formValues.target.lname.value,
      formValues.target.company.value,
      formValues.target.address.value,
      formValues.target.city.value,
      formValues.target.state.value,
    ];
    const extractedFormData = {
      email,
      firstName,
      lastName,
      company,
      address,
      city,
      state,
    };
    setData((data) => [...data, { ...extractedFormData }]);
  };

  /**
   * Clears the input fields
   */
  const handleClear = () => {
    if (typeof window !== "undefined") {
      for (let id of inputID) {
        document.getElementById(id).value = "";
      }
      setData([]);
    }
  };

  /**
   * Modal
   */
  const toggleModal = (state) => {
    if (typeof window !== "undefined") {
      switch (state) {
        case "open":
          let count = 0;
          for (let id of inputID) {
            document.getElementById(id).value.length > 0 ? ++count : void 0;
          }
          if (count >= inputID.length - 2) {
            document.getElementById("modal").showModal();
            setShowTable(true);
          } else {
            alert("Fill up the form to preview!");
          }
          break;
        case "close":
          document.getElementById("modal").close();
          setShowTable(false);
          break;
      }
    }
  };

  const getPreview = () => {
    return `
    Name: ${
      document.getElementById("fname").value +
      " " +
      document.getElementById("lname").value
    }
    Company: ${document.getElementById("company").value}
    Email: ${document.getElementById("email").value}
    Address: ${document.getElementById("address").value}
    City: ${document.getElementById("city").value}
    State: ${document.getElementById("state").value}

    `;
  };

  /**
   * Side Effects
   */

  useEffect(() => {
    data.length > 0 ? sendData(data) : void 0;
  }, [data]);

  return (
    <main className="main">
      <form onSubmit={(e) => saveData(e)}>
        <fieldset className="form">
          <legend>Registration Form</legend>
          <div>
            <label htmlFor="fname">First name:</label>
            <input
              type="text"
              id="fname"
              name="fname"
              maxLength={25}
              required
            />
          </div>
          <div>
            <label htmlFor="lname">Last name:</label>
            <input
              type="text"
              id="lname"
              name="lname"
              maxLength={25}
              required
            />
          </div>
          <div>
            <label htmlFor="company">Company:</label>
            <input type="text" id="company" name="company" maxLength={50} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength={50}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              minLength={6}
              maxLength={15}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$"
            />
          </div>
          <div>
            <label htmlFor="c_password">Confirm Password:</label>
            <input
              type="password"
              id="c_password"
              name="c_password"
              minLength={6}
              maxLength={15}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$"
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" />
          </div>{" "}
          <div>
            <label htmlFor="state">State:</label>
            <input type="text" id="state" name="state" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flexStart",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                toggleModal("open");
              }}
            >
              Preview
            </button>
            <input type="submit" value="Add"></input>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                data.length > 0
                  ? exportToCsv(data)
                  : alert("Fill in the form to generate CSV");
              }}
            >
              Export to CSV
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleClear();
              }}
            >
              Clear
            </button>
          </div>
        </fieldset>
      </form>
      <aside>
        <h4>Password Requirements</h4>
        <ul>
          <li> Minimum 15 characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character</li>
        </ul>
      </aside>
      <dialog id="modal">
        {showTable && (
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {document.getElementById("fname").value +
                    " " +
                    document.getElementById("lname").value}
                </td>
                <td>{document.getElementById("company").value}</td>
                <td>{document.getElementById("email").value}</td>
                <td>{document.getElementById("address").value}</td>
                <td>{document.getElementById("city").value}</td>
                <td>{document.getElementById("state").value}</td>
              </tr>
            </tbody>
          </Table>
        )}
        <button
          className="btn btn-primary"
          onClick={() => toggleModal("close")}
        >
          Close
        </button>
      </dialog>
    </main>
  );
};

export default Form;
