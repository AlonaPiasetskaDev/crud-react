import React, { useState, useRef } from "react";
import {
  Card,
  Button,
  Container,
  Col,
  Row,
  Modal,
  Form,
} from "react-bootstrap";

const EditUserModal = (props) => {
  // 1. это не ХОК компонент.
  // 2. до открытия он вообще ничего не знает. по хорошему с лейзилоадом он вообще не должен рендерится.
  //    Можешь глянуть https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
  // 3. Юзера для едита он должен получать с пропсов
  // 4. Для юзеров как и для профелей свой контекст
  //
  // Пример формы через useRef. https://codesandbox.io/s/vmwxjnv433?file=/src/index.js:392-418

  const { user, onSave, show, onHide } = props;
  const editFormRef = useRef();

  const handleSaveClick = () => {
    // let data = inputs.reduce((acc, input) => {
    //   return {
    //     ...acc,
    //     [input.name]: input.value,
    //   };
    // });
    const data = Object.fromEntries(
      new FormData(editFormRef.current).entries()
    );
    // тут isAdmin = "ON" или его нет
    console(" EditUserModal handleSaveClick");
    console.log(data);

    data.isAdmin ? (data.isAdmin = true) : (data.isAdmin = false);
    onSave(data);
    onHide();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        id="editUser"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={editFormRef}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="name" defaultValue={user.name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={user.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsAdmin">
              <Form.Check
                type="checkbox"
                name="isAdmin"
                label="is admin"
                defaultChecked={user.isAdmin}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" id="saveBtn" onClick={handleSaveClick}>
            <i className="bi bi-check2"></i>
          </Button>
          <Button variant="secondary" id="rejectBtn">
            <i className="bi bi-x"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const UserCard = (props) => {
  const [isEditing, setEditing] = useState(false);
  const { user, onSave, onDelete } = props;

  const saveUser = (data) => {
    console.log(`UserCard saveUser`);
    console.log(data);
    // do something if needed
    onSave(user.id, data);
    setEditing(!isEditing);
  };

  // const handleEditClick = () => {
  //   setEditing(!isEditing);
  // }
  return (
    <>
      <Container>
        <Row>
          <Col className="profile" md={{ span: 6, offset: 3 }}>
            <h1>{user.name.toLowerCase()}</h1>
          </Col>
          <Col className="profile" md={{ span: 6, offset: 3 }}>
            <h3>{user.email.toLowerCase()}</h3>
          </Col>
          <Col className="profile" md={{ span: 6, offset: 3 }}>
            <p> {user.isAdmin ? "admin" : "user"}</p>
          </Col>
          <Col className="profile" md={{ span: 6, offset: 3 }}>
            <Button
              className="btn-sm"
              variant="link"
              id="edit"
              onClick={() => {
                setEditing(!isEditing);
              }}
            >
              <i className="bi bi-pencil"></i>
            </Button>
            {!!onDelete && (
              <Button
                className="btn-sm"
                variant="link"
                id="delete"
                onClick={() => {
                  onDelete(user.id);
                }}
              >
                <i className="bi bi-trash"></i>
              </Button>
            )}
          </Col>
        </Row>
        <EditUserModal
          user={user}
          onSave={saveUser}
          show={isEditing}
          onHide={() => {
            setEditing(!isEditing);
          }}
        />
      </Container>
    </>
  );
};
