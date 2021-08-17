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
} from "@blueprintjs/core";

import Tittle from "./Tittle";
import axios from "axios";

const Positions = () => {
  const {
    positions,
    setPositions,
    position,
    setPosition,
    employees,
    formToggle,
    setFormToggle,
    updating,
    setUpdating,
    setDone,
    positionEmpty,
  } = useContext(AppContext);

  const [positionRemoveModal, setPositionRemoveModal] = useState(false);

  const storePosition = async (data) => {
    setDone(false);
    if (data.id === null) {
      await axios
        .post("http://localhost:3001/createCargo", data)
        .then(async () => {
          axios.get("http://localhost:3001/cargos").then(async (resp) => {
            setPositions(resp.data);
            setPosition(positionEmpty);
          });
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else {
      const respUpdate = await axios.post(
        "http://localhost:3001/editCargo",
        data
      );
      setPositions(respUpdate.data);
    }
    setDone(true);
    setFormToggle(false);
  };

  const removePosition = async (id) => {
    setDone(false);
    axios
      .post("http://localhost:3001/removeCargo", { id: id })
      .then(async () => {
        axios.get("http://localhost:3001/cargos").then(async (response) => {
          const resp = await response.data;
          await setPositions(resp);
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
        <Tittle icon="user" tittle="Cargos" button={true} />
        <Collapse isOpen={formToggle}>
          <Card>
            <H4>{updating ? "Atualizar cargo" : "Novo cargo"}</H4>
            <InputGroup
              value={position.descricao}
              large={true}
              leftElement={<Icon icon="user" color="#aaa6" />}
              rightElement={
                <>
                  <Button
                    icon="record"
                    disabled={position.descricao === "" ? true : false}
                    text={updating ? "Atualizar" : "Salvar"}
                    intent={updating ? "Success" : "Warning"}
                    onClick={() => {
                      storePosition(position);
                      setFormToggle(false);
                      setUpdating(false);
                      setPosition(positionEmpty);
                    }}
                  />
                  <Button
                    icon="stop"
                    text="Cancelar"
                    onClick={() => {
                      setFormToggle(false);
                      setUpdating(false);
                      setPosition(positionEmpty);
                    }}
                  />
                </>
              }
              onChange={(event) => {
                setPosition({ ...position, descricao: event.target.value });
              }}
              placeholder={updating ? "" : "Novo cargo ..."}
            />
          </Card>
        </Collapse>

        <div bp="grid">
          <Card bp="12">
            <table className="bp3-html-table bp3-html-table-striped bp3-interactive flex-fill .modifier">
              <thead bp="12">
                <tr bp={"flex"}>
                  <th bp={"fill"}>Descrição</th>
                  <th bp={"fit"}>
                    <Icon icon={"edit"} size={16} />
                  </th>
                  <th bp={"fit"}>
                    <Icon icon={"trash"} size={16} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => {
                  return (
                    <tr bp={"flex"} key={pos.id}>
                      <td bp={"fill"}>{pos.descricao}</td>
                      <td bp={"fit"}>
                        <Button
                          icon={"edit"}
                          onClick={() => {
                            setUpdating(true);
                            setFormToggle(true);
                            setPosition({
                              id: pos.id,
                              descricao: pos.descricao,
                            });
                          }}
                        />
                      </td>
                      <td bp={"fit"}>
                        <Button
                          icon={"trash"}
                          onClick={() => {
                            setPosition({
                              id: pos.id,
                              descricao: pos.descricao,
                            });
                            setUpdating(false);
                            setFormToggle(false);
                            setPositionRemoveModal(true);
                          }}
                        />
                        <Dialog
                          isOpen={positionRemoveModal}
                          icon="info-sign"
                          title={"Excluir ?"}
                        >
                          <Card>
                            <H5>
                              Excluir cargo <b>{position.descricao}</b> ?
                            </H5>
                            <p>
                              O cargo não poderá ser recuperado. Confirme a
                              exclusão:
                            </p>
                            <div
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
                                  removePosition(position.id);
                                  setPositionRemoveModal(false);
                                  setPosition(positionEmpty);
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
                                  setPosition(positionEmpty);
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

export default Positions;
