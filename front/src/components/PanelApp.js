import { useContext } from "react";
import AppContext from "../appContext/context";
import { H1, H3, H4, Card, Elevation } from "@blueprintjs/core";

import Tittle from "./Tittle";

const PanelApp = () => {
  const { positions, employees } = useContext(AppContext);
  return (
    <div className="Container">
      <Card elevation={Elevation.ZERO}>
        <Tittle icon="dashboard" tittle="Painel Administrativo" />
        <div bp="grid">
          <Card bp="6" elevation={Elevation.ZERO}>
            <H3>Total de funcionários</H3>
            <H1>{employees.length}</H1>
          </Card>

          <Card bp="6" elevation={Elevation.ZERO}>
            <H3>Total de cargos</H3>
            <H1>{positions.length}</H1>
          </Card>

          <Card bp="12">
            <H4>Total de funcionários</H4>
            <table className="bp3-html-table bp3-html-table-striped bp3-interactive flex-fill .modifier">
              <thead bp="12">
                <tr>
                  <th bp="7">Nome</th>
                  <th bp="3">Cargo</th>
                  <th bp="9">Salário</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => {
                  return (
                    <tr key={emp.id}>
                      <td>{emp.nome}</td>
                      <td>
                        {positions.find((p) => p.id === emp.id_cargo).descricao}
                      </td>
                      <td>{emp.salario}</td>
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

export default PanelApp;
