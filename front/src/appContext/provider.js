import React, { useEffect, useState } from "react";
import AppContext from "./context";
import axios from "axios";

const AppProvider = ({ children }) => {
  const employeeEmpty = {
    id: null,
    name: "",
    idPosition: "",
    wage: 0,
    dateBirth: "",
  };
  const positionEmpty = { id: null, description: "" };

  const [positions, setPositions] = useState([]);
  const [position, setPosition] = useState(positionEmpty);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(employeeEmpty);
  const [actualView, setActualView] = useState(0);
  const [formToggle, setFormToggle] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [done, setDone] = useState(true);

  useEffect(() => {
    setDone(false);
    axios.get("http://localhost:3001/positions").then(async (response) => {
      const resp = await response.data;
      console.log(resp);
      await setPositions(resp);
    });
    axios.get("http://localhost:3001/employees").then(async (response) => {
      const resp = await response.data;
      await setEmployees(resp);
    });
    setDone(true);
  }, []);

  return (
    <AppContext.Provider
      value={{
        employees,
        setEmployees,
        employee,
        employeeEmpty,
        setEmployee,
        positions,
        setPositions,
        position,
        positionEmpty,
        setPosition,
        actualView,
        setActualView,
        formToggle,
        setFormToggle,
        updating,
        setUpdating,
        done,
        setDone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
