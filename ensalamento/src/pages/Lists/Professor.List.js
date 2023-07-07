import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Professor = () => {
  const [listaP, setListaP] = useState([]);
  const [prof, setProf] = useState({ name: "", cpf: "", id: 0 });
  const [modeForm, setModeForm] = useState("create");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const objStr = localStorage.getItem("lProfessor");
    const objLista = JSON.parse(objStr);
    setListaP(objLista || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("lProfessor", JSON.stringify(listaP));
  }, [listaP]);

  const onSave = () => {
    if (modeForm === "create") {
      prof.id = listaP.length + 1;
      listaP.push(prof)
      setListaP([...listaP]);
    }

    if (modeForm === "edit") {
      const updatedList = listaP.map((p) =>
        p.id === prof.id ? { ...p, name: prof.name, cpf: prof.cpf } : p
      );
      setListaP(updatedList);
    }
    setProf({ name: "", cpf: "" });
    handleCloseModal();
  };

  const pree = (pAux) => {
    setProf(pAux);
    setModeForm("edit");
    setShowModal(true);
  };

  const onNew = () => {
    setModeForm("create");
    setProf({ name: "", cpf: "" });
    setShowModal(true);
  };

  const onRemove = (pRemove) => {
    const updatedList = listaP.filter((p) => p.id !== pRemove.id);
    setListaP(updatedList);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <Container>
        <Row>
          <h1>Professor</h1>
        </Row>
        <Row>
          <Container>
            <Button variant="primary" className="addButton" onClick={onNew}>
              Novo
            </Button>
          </Container>
        </Row>
      </Container>
      <br />
      <Row>
        <Col>Lista Professores</Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>CPF</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaP.map((pAux) => {
                return (
                  <tr key={pAux.id}>
                    <td>{pAux.id}</td>
                    <td>{pAux.name}</td>
                    <td>{pAux.cpf}</td>
                    <td>
                      <Button onClick={() => pree(pAux)} variant="warning">
                        Editar
                      </Button>
                      <Button onClick={() => onRemove(pAux)} variant="danger">
                        Remover
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                value={prof.name}
                onChange={({ target }) =>
                  setProf({ ...prof, name: target.value })
                }
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                value={prof.cpf}
                type="text"
                onChange={({ target }) =>
                  setProf({ ...prof, cpf: target.value })
                }
                placeholder="Enter cpf"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSave}>
            Salvar
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Professor;
