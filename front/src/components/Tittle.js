import { useContext } from "react";
import AppContext from "../appContext/context";
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarHeading,
  NavbarGroup,
  H2,
  Icon,
} from "@blueprintjs/core";

const Tittle = (props) => {
  const {
    formToggle,
    setFormToggle,
    setPosition,
    actualView,
    employee,
    setEmployee,
  } = useContext(AppContext);

  return (
    <div className="Space">
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>
            <Icon icon={props.icon} size={28} />
          </NavbarHeading>
          <H2>{props.tittle}</H2>
        </NavbarGroup>
        <>
          {props.button && !formToggle ? (
            <NavbarGroup align={Alignment.RIGHT}>
              <Button
                className={Classes.BUTTON}
                icon={formToggle ? "minus" : "plus"}
                text="Novo"
                onClick={() => {
                  setFormToggle(!formToggle);
                  if (!formToggle) {
                    if (actualView === 1)
                      setEmployee({
                        ...employee,
                        id: null,
                        id_cargo: "",
                        nome: "",
                      });
                  } else {
                    setPosition({ id: null, descricao: "" });
                  }
                }}
              />
            </NavbarGroup>
          ) : (
            <></>
          )}
        </>
      </Navbar>
    </div>
  );
};

export default Tittle;
