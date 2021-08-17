import { useContext } from "react";
import AppContext from "../appContext/context";
import { Card, Elevation, Icon } from "@blueprintjs/core";
import Tittle from "./Tittle";

const Employees = () => {
  const { employees } = useContext(AppContext);
  return (
    <div className="Container">
      <Card elevation={Elevation.ZERO}>
        <Tittle icon="people" tittle="Funcionários" button={true} />
        <div bp="grid">
          <Card bp="12">
            <table className="bp3-html-table bp3-html-table-striped bp3-interactive flex-fill .modifier">
              <thead bp="12">
                <tr>
                  <th bp="5">Nome</th>
                  <th bp="2">Cargo</th>
                  <th bp="2">Salário</th>
                  <th bp="1">Data Nasc.</th>
                  <th bp="1">
                    <Icon icon={"edit"} size={16} />
                  </th>
                  <th bp="1">
                    <Icon icon={"trash"} size={16} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((func) => {
                  return (
                    <tr key={func.id}>
                      <td>{func.nome}</td>
                      <td>{func.id_cargo}</td>
                      <td>{func.salario}</td>
                      <td>{func.dt_nasc}</td>
                      <td>
                        <Icon icon={"edit"} size={16} />
                      </td>
                      <td>
                        <Icon icon={"trash"} size={16} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Employees;
