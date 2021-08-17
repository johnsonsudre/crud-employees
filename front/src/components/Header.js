import { useContext } from "react";
import AppContext from "../appContext/context";
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

import ReactLoading from "react-loading";

const HeaderApp = () => {
  const { done, setDone, actualView, setActualView } = useContext(AppContext);
  return (
    <>
      <Navbar>
        <Navbar className="Container">
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>
              <b>CRUD teste</b>
            </NavbarHeading>
            <NavbarDivider />
            <Button
              className={Classes.MINIMAL}
              icon="dashboard"
              text="Painel"
              id="panel"
              onClick={() => setActualView(0)}
            />
            <Button
              className={Classes.MINIMAL}
              icon="people"
              text="Funcionários"
              id="employee"
              onClick={() => setActualView(1)}
            />
            <Button
              className={Classes.MINIMAL}
              icon="user"
              text="Cargos"
              id="position"
              onClick={() => setActualView(2)}
            />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            {!done ? (
              <ReactLoading
                type={"bars"}
                color={"primary"}
                height={32}
                width={32}
              />
            ) : (
              <></>
            )}
          </NavbarGroup>
        </Navbar>
      </Navbar>
    </>
  );
};

export default HeaderApp;
