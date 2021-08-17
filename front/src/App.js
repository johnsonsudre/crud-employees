import { useContext } from "react";
import AppContext from "./appContext/context";
import { Tab, Tabs } from "@blueprintjs/core";
import HeaderApp from "./components/Header";
import PanelApp from "./components/PanelApp";
import Positions from "./components/Positions";
import Employees from "./components/Employees";

import "./App.css";

const App = () => {
  const { actualView, done } = useContext(AppContext);
  return (
    <div>
      <HeaderApp />
      <Tabs
        id="TabsExample"
        onChange={() => {}}
        selectedTabId={"" + actualView}
      >
        <Tab id="0" panel={<PanelApp />} />
        <Tab id="1" panel={<Employees />} />
        <Tab id="2" panel={<Positions />} />
      </Tabs>
    </div>
  );
};

export default App;
