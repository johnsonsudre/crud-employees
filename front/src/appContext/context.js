import { createContext } from "react";

const defaultView = 0;

const AppContext = createContext({
  employees: [],
  setEmployees: () => {},
  employee: {},
  setEmployee: () => {},
  positions: [],
  setPositions: () => {},
  position: {},
  setPosition: () => {},
  actualView: defaultView,
  setActualView: () => {},
  formToggle: false,
  setFormToggle: () => {},
  updating: false,
  setUpdating: () => {},
  done: true,
  setDone: () => {},
  employeeEmpty: {},
  positionEmpty: {},
});

export default AppContext;
