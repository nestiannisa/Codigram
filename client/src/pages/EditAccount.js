import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateAccount } from "../Action/userAction";
import { useNavigate } from "react-router-dom";

function EditAccount() {
  //const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarShow, setAvatarShow] = useState("https://fakeimg.pl/250x100/");
  const [avatarName, setAvatarName] = useState("Choose file");
  const [bio, setBio] = useState("");

  const onFileChange = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarShow(URL.createObjectURL(e.target.files[0]));
    setAvatarName(e.target.files[0].name);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = +params.id;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("1.masuk handle submit");
    //add user
    navigate("/account");
    const payload = new FormData();
    payload.append("avatar", avatar);
    payload.append("name", name);
    payload.append("bio", bio);
    dispatch(updateAccount(payload));
  };

  
  /**<Form.Group className="mb-3 mx-5">
              <h5 className="pt-5">EditPost</h5>
              <Form.Label>Image</Form.Label>
              <Form.Control id="image" type="text" />
            </Form.Group>*/
  return (
    <>
      <Row className="justify-content-md-center pt-5">
        <Col md={4}>
          <Form className="formEditUser">
            <h5 className="pt-5">Edit Account</h5>
            <Form.Group className="mb-3 mx-5">
              <Row>
                <img src={avatarShow} />
              </Row>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                id="avatar"
                onChange={(e) => onFileChange(e)}
                name="avatar"
                type="file"
              />
            </Form.Group>
            <Form.Group className="mb-3 mx-5">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3 mx-5">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                name="bio"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)} className="mb-5">
              Post
            </Button>
            <Button href="/account" variant="danger" className="mb-5 mx-3">
              Back
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default EditAccount;
