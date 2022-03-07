import React, { useEffect } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../asset/logo.png";
import { accountUser } from "../Action/userAction";
import { useSelector, useDispatch } from "react-redux";
import { BsPlusLg } from "react-icons/bs";
import { BiSearchAlt} from "react-icons/bi";
import { login, token_for_access } from "../utils/constant";

function NavbarComponents() {
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    //userLogin(false);
    localStorage.clear();
    navigate("/");
  };

  const { userAccountResult, userAccountLoading, userAccountError } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    //panggil action post list
    console.log("1.use");
    dispatch(accountUser(token_for_access));
  }, [dispatch]);
  
  return (
    <>
      <Navbar className="navbar" variant="dark" expand="sm">
        <Container>
          <img
            src={logo}
            className="rounded-circle mx-2"
            width="30px"
            height="30px"
            alt=""
          />
          <Navbar.Brand href="/" className="navbarCod">
            Codigram
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navCom me-auto">
              <Nav.Link href="/search">
                <BiSearchAlt /> Search
              </Nav.Link>
              <Nav.Link href="/posts/add">
                <BsPlusLg /> Add Post
              </Nav.Link>
            </Nav>
            <Nav className="navCom">
              <NavDropdown title={`Hello, ${userAccountResult.username} !`}>
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                <NavDropdown.Item href="/account"></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  {login ? (
                    <Button
                      variant="danger"
                      href="/"
                      onClick={(e) => logoutHandler(e)}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button variant="primary">Login</Button>
                  )}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponents;
