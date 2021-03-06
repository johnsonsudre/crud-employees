import { useContext, useEffect, useState } from "react";
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
        .post("http://localhost:3001/createPosition", data)
        .then(async () => {
          axios.get("http://localhost:3001/positions").then(async (resp) => {
            setPositions(resp.data);
            setPosition(positionEmpty);
          });
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else {
      const respUpdate = await axios.post(
        "http://localhost:3001/editPosition",
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
      .post("http://localhost:3001/removePosition", { id: id })
      .then(async () => {
        axios.get("http://localhost:3001/positions").then(async (response) => {
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

  const PositionRemove = () => {
    const isAllowed = employees.find((emp) => emp.idPosition === position.id)
      ? false
      : true;

    return (
      <>
        <Dialog
          isOpen={positionRemoveModal}
          icon="info-sign"
          title={isAllowed ? "Excluir?" : "Imposs??vel excluir!"}
        >
          <Card>
            <H5>
              {isAllowed
                ? `Excluir cargo [${position.description}] ?`
                : `O cargo [${position.description}] est?? associado a um ou mais funcion??rios.`}
            </H5>
            <p>
              {isAllowed
                ? "O cargo n??o poder?? ser recuperado. Confirme a exclus??o:"
                : "Altere cargos na op????o Funcion??rios"}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15,
              }}
            >
              {isAllowed ? (
                <>
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
                </>
              ) : (
                <></>
              )}

              <Button
                className={Classes.POPOVER_DISMISS}
                icon={isAllowed ? "stop" : "undo"}
                text={isAllowed ? "Cancelar" : "Voltar"}
                onClick={() => {
                  setPosition(positionEmpty);
                  setPositionRemoveModal(false);
                }}
              />
            </div>
          </Card>
        </Dialog>
      </>
    );
  };

  return (
    <div className="Container">
      <Card elevation={Elevation.ZERO}>
        <Tittle icon="user" tittle="Cargos" button={true} />
        <Collapse isOpen={formToggle}>
          <Card>
            <H4>{updating ? "Atualizar cargo" : "Novo cargo"}</H4>
            <InputGroup
              value={position.description}
              large={true}
              leftElement={<Icon icon="user" color="#aaa6" />}
              rightElement={
                <>
                  <Button
                    icon="record"
                    disabled={position.description === "" ? true : false}
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
                setPosition({ ...position, description: event.target.value });
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
                  <th bp={"fill"}>Descri????o</th>
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
                      <td bp={"fill"}>{pos.description}</td>
                      <td bp={"fit"}>
                        <Button
                          icon={"edit"}
                          onClick={() => {
                            setUpdating(true);
                            setFormToggle(true);
                            setPosition({
                              id: pos.id,
                              description: pos.description,
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
                              description: pos.description,
                            });
                            setUpdating(false);
                            setFormToggle(false);
                            setPositionRemoveModal(true);
                          }}
                        />
                        <PositionRemove />
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
