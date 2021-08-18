import { useContext, useState } from "react";
import AppContext from "../appContext/context";
import {
  Intent,
  Button,
  InputGroup,
  Card,
  Elevation,
  Icon,
  Collapse,
  Classes,
  H5,
  Divider,
  Dialog,
  H4,
  H2,
  H3,
} from "@blueprintjs/core";

import Tittle from "./Tittle";
import axios from "axios";

const Employees = () => {
  const {
    employees,
    setEmployees,
    employee,
    setEmployee,
    positions,
    formToggle,
    setFormToggle,
    updating,
    setUpdating,
    done,
    setDone,
    employeeEmpty,
  } = useContext(AppContext);

  const [positionRemoveModal, setPositionRemoveModal] = useState(false);

  const storeEmployee = async (data) => {
    setDone(false);
    if (data.id === null) {
      await axios
        .post("http://localhost:3001/createEmployee", data)
        .then(() => {
          axios.get("http://localhost:3001/employees").then(async (resp) => {
            await setEmployees(resp.data);
            setEmployee(employeeEmpty);
          });
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else {
      const respUpdate = await axios.post(
        "http://localhost:3001/editEmployee",
        data
      );
      setEmployees(respUpdate.data);
    }
    setDone(true);
    setFormToggle(false);
  };

  const removeEmployee = (id) => {
    setDone(false);
    axios
      .post("http://localhost:3001/removeEmployee", { id: id })
      .then(() => {
        axios.get("http://localhost:3001/employees").then(async (response) => {
          const resp = await response.data;
          setEmployees(resp);
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setDone(true);
    setFormToggle(false);
    setPositionRemoveModal(false);
  };

  return (
    <div className="Container">
      <Card elevation={Elevation.ZERO}>
        <Tittle icon="user" tittle="Funcionários" button={true} />
        <Collapse isOpen={formToggle}>
          <Card>
            <H4 bp={"padding-bottom--sm"}>
              {updating ? "Atualizar funcionário" : "Novo funcionário"}
            </H4>
            {!positions.length ? (
              <>
                <H3 color="red">Nenhum cargo cadastrado.</H3>
                <H4>Não é possível incluir funcionário</H4>
              </>
            ) : (
              ""
            )}

            <div bp={"grid"}>
              <div bp={"9 padding-bottom--sm"}>
                <label className="bp3-label .modifier">
                  Nome
                  <InputGroup
                    value={employee.nome}
                    leftElement={<Icon icon="people" color="#aaa6" />}
                    onChange={(event) => {
                      setEmployee({ ...employee, nome: event.target.value });
                    }}
                    placeholder={updating ? "" : "Novo funcionário ..."}
                  />
                </label>
              </div>

              <div className="bp3-html-select" bp={"3"}>
                <label className="bp3-label">
                  Cargo
                  <div className="bp3-select">
                    <select
                      value={employee.id_cargo}
                      onChange={(event) => {
                        setEmployee({
                          ...employee,
                          id_cargo: event.target.value,
                        });
                      }}
                    >
                      <option value={""}>Escolha o cargo...</option>
                      {positions.map((pos) => {
                        return (
                          <option key={pos.id} value={pos.id}>
                            {pos.descricao}
                          </option>
                        );
                      })}
                    </select>
                    <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
                  </div>
                </label>
              </div>
              <div bp={"4"}>
                <label className="bp3-label">
                  Data de nascimento
                  <InputGroup
                    value={employee.dt_nasc}
                    leftElement={<Icon icon="time" color="#aaa6" />}
                    onChange={(event) => {
                      setEmployee({ ...employee, dt_nasc: event.target.value });
                    }}
                  />
                </label>
              </div>
              <div bp={"4"}>
                <label className="bp3-label">
                  Salário
                  <InputGroup
                    value={employee.salario}
                    leftElement={<Icon icon="dollar" color="#aaa6" />}
                    onChange={(event) => {
                      setEmployee({ ...employee, salario: event.target.value });
                    }}
                  />
                </label>
              </div>
            </div>
          </Card>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15,
              }}
            >
              <Button
                disabled={
                  employee.nome === "" || employee.id_cargo === ""
                    ? true
                    : false
                }
                icon="record"
                text={updating ? "Atualizar" : "Salvar"}
                intent={updating ? "Success" : "Warning"}
                onClick={async () => {
                  await storeEmployee(employee);
                  setFormToggle(false);
                  setUpdating(false);
                  setEmployee(employeeEmpty);
                }}
              />
              <Divider />
              <Button
                icon="stop"
                text="Cancelar"
                onClick={() => {
                  setFormToggle(false);
                  setUpdating(false);
                  setEmployee(employeeEmpty);
                }}
              />
            </div>
          </Card>
        </Collapse>

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
                {employees.map((emp) => {
                  return (
                    <tr key={emp.id}>
                      <td>{emp.nome}</td>
                      {/* inventory.find( fruit => fruit.name === 'cherries' ); */}
                      <td>
                        {positions.find((p) => p.id === emp.id_cargo).descricao}
                      </td>
                      <td>{emp.salario}</td>
                      <td>{emp.dt_nasc}</td>
                      <td>
                        <Button
                          icon={"edit"}
                          onClick={() => {
                            setUpdating(true);
                            setFormToggle(true);
                            setEmployee({
                              id: emp.id,
                              nome: emp.nome,
                              id_cargo: emp.id_cargo,
                              salario: emp.salario,
                              dt_nasc: emp.dt_nasc,
                            });
                          }}
                        />
                      </td>
                      <td>
                        <Button
                          icon={"trash"}
                          onClick={() => {
                            setEmployee(emp);
                            setUpdating(false);
                            setFormToggle(false);
                            setPositionRemoveModal(true);
                          }}
                        />
                        <Dialog
                          isOpen={positionRemoveModal}
                          icon="info-sign"
                          title="Excluir ?"
                        >
                          <Card>
                            <H5>Confirme exclusão</H5>
                            <p>
                              Tem certeza de que deseja remover{" "}
                              <b>{employee.descricao}</b>?
                              <br />
                              Você não poderá recuperá-lo.
                            </p>

                            <div
                              bp="grid"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 15,
                              }}
                            >
                              <Button
                                intent={Intent.DANGER}
                                className={Classes.POPOVER_DISMISS}
                                onClick={() => {
                                  removeEmployee(employee.id);
                                  setPositionRemoveModal(false);
                                  setEmployee(employeeEmpty);
                                }}
                                icon={"trash"}
                                text={"Remover"}
                              />

                              <Divider />
                              <Button
                                className={Classes.POPOVER_DISMISS}
                                icon={"stop"}
                                text={"Cancelar"}
                                onClick={() => {
                                  setPositionRemoveModal(false);
                                }}
                              />
                            </div>
                          </Card>
                        </Dialog>
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

// import { useContext } from "react";
// import AppContext from "../appContext/context";
// import { Card, Elevation, Icon } from "@blueprintjs/core";
// import Tittle from "./Tittle";

// const Employees = () => {
//   const { employees } = useContext(AppContext);
//   return (
//     <div className="Container">
//       <Card elevation={Elevation.ZERO}>
//         <Tittle icon="people" tittle="Funcionários" button={true} />
//         <div bp="grid">
//           <Card bp="12">
//             <table className="bp3-html-table bp3-html-table-striped bp3-interactive flex-fill .modifier">
//               <thead bp="12">
//                 <tr>
//                   <th bp="5">Nome</th>
//                   <th bp="2">Cargo</th>
//                   <th bp="2">Salário</th>
//                   <th bp="1">Data Nasc.</th>
//                   <th bp="1">
//                     <Icon icon={"edit"} size={16} />
//                   </th>
//                   <th bp="1">
//                     <Icon icon={"trash"} size={16} />
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {employees.map((func) => {
//                   return (
//                     <tr key={func.id}>
//                       <td>{func.nome}</td>
//                       <td>{func.id_cargo}</td>
//                       <td>{func.salario}</td>
//                       <td>{func.dt_nasc}</td>
//                       <td>
//                         <Icon icon={"edit"} size={16} />
//                       </td>
//                       <td>
//                         <Icon icon={"trash"} size={16} />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </Card>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Employees;
