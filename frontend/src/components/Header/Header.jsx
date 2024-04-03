import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

// import logo from "../../assets/images/logo.png";
import "./header.css";
// import { SiAzuredataexplorer } from "react-icons/si";
import { AuthContext } from "./../../context/AuthContext";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const roleId = localStorage.getItem("role");
  const [role, setRole] = useState(roleId);

  const nav__links =
    role !== "admin"
      ? [
          {
            path: "/home",
            display: "Home",
          },
          {
            path: "/tours",
            display: "Tours",
          },
        ]
      : [
          {
            path: "/home",
            display: "Home",
          },
          {
            path: "/admin",
            display: "Dashboard",
          },
          {
            path: "/admin/users",
            display: "User",
          },
          {
            path: "/admin/products",
            display: "Tours",
          },
          {
            path: "/admin/newproduct",
            display: "New Tour",
          },
          {
            path: "/about",
            display: "About",
          },
          {
            path: "/tours",
            display: "Tours",
          },
        ];

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setInterval(function () {
      const roleId = localStorage.getItem("role");
      setRole(roleId);
    }, 300);
  }, []);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* =========== logo ============ */}
            <div className="logo">
              {/* <img src={logo} alt="" /> */}
              <h1
                className="font1"
                style={{ fontSize: "18px", marginBottom: "0px" }}
              >
                {/* <SiAzuredataexplorer className='icon'/>  */}
                &nbsp;Shreeji Global Tours
              </h1>
            </div>
            {/* =========== logo  end============ */}

            {/* ===========menu start============ */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ===========menu end============ */}

            <div className="nav__right d-flex align-items-center gap-4 ">
              <div className="nav__btns d-flex align-items-center gap-4 ">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
