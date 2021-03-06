import { useContext } from "react";
import AppContext from "../appContext/context";
import { H1, H3, H4, Card, Elevation, Divider } from "@blueprintjs/core";
import Bar from "react-google-charts";

import Tittle from "./Tittle";

const PanelApp = () => {
  const { positions, employees } = useContext(AppContext);

  const dataWagesByPosition = positions
    .map((pos) => {
      const empWages = employees.filter((emp) => emp.idPosition === pos.id);
      return empWages;
    })
    .filter((emp) => emp.length > 0)
    .map((e) => {
      return [
        positions.filter((i) => i.id === e[0].idPosition)[0].description,
        e.reduce((total, i) => total + i.wage, 0),
      ];
    });

  const dataEmployeesWages = employees.map((emp) => ({
    employee: emp.name,
    wage: emp.wage,
  }));

  const headerChartEmployee = ["Nome", "Salário"];
  const headerChartWagesByPosition = ["Cargo", "Folha de pagamento"];

  const totalWagesByPositions = positions.map((pos) => {
    const empWages = employees.filter((emp) => {
      if (emp.idPosition === pos.id) return emp.wage;
    });
    return empWages.reduce((accumulated, emp) => accumulated + emp.wage, 0);
  });

  dataWagesByPosition.unshift(headerChartWagesByPosition);

  const totalPayroll = totalWagesByPositions.reduce((accum, e) => accum + e, 0);

  const dataChartEmployees = dataEmployeesWages.map((i) => [
    i.employee,
    i.wage,
  ]);
  dataChartEmployees.unshift(headerChartEmployee);

  return (
    <div className="Container">
      <Card elevation={Elevation.ZERO}>
        <Tittle icon="dashboard" tittle="Painel Administrativo" />
        <div bp="grid">
          <div bp="12">
            <div bp="grid">
              <div bp="6">
                <Card>
                  <H3>Total de funcionários</H3>
                  <H1>{employees.length}</H1>
                </Card>
              </div>
              <div bp="6">
                <Card>
                  <H3>Total da folha de pagamento</H3>
                  <H1>
                    {Number(totalPayroll).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </H1>
                </Card>
              </div>
            </div>
          </div>
          <Card bp="12" elevation={Elevation.ZERO}>
            <H3>Salários</H3>
            <Divider />
            <div>
              <Bar
                chartType="Bar"
                loader={<div>Carregando gráfico</div>}
                data={dataChartEmployees}
                options={{
                  title: "Funcionário e salários",
                  pieHole: 0.25,
                }}
              />
            </div>
          </Card>

          <Card bp="12" elevation={Elevation.ZERO}>
            <H3>Folha de pagamento por cargos</H3>
            <Divider />
            <div>
              <Bar
                chartType="Bar"
                loader={<div>Carregando gráfico</div>}
                data={dataWagesByPosition}
                options={{
                  title: "Folha de pagamento por cargo",
                  pieHole: 0.25,
                }}
              />
            </div>
          </Card>

          <Card bp="12">
            <H3>Funcionários</H3>
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
                      <td>{emp.name}</td>
                      <td>
                        {
                          positions.find((p) => p.id === emp.idPosition)
                            .description
                        }
                      </td>
                      <td>{emp.wage}</td>
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
