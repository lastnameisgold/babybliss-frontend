import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from "react";

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <div>
      <Navbar className="px-4 me-auto" bg="dark" variant="dark">
        <Navbar.Brand className="me-auto" href="/">
          BabyBliss
        </Navbar.Brand>

        <Nav>
          {isAuth ? (
            <>
              <Nav.Link href="/diaper">Add Diaper</Nav.Link>
              <Nav.Link href="#">Add Feeding</Nav.Link>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}
