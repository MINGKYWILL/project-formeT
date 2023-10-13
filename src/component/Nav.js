import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../images/main-logo.png";

export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavWrapper show={show ? "true" : "false"}>
      <LogoLink to={`/`}>
        <img src={logoImage} alt="logo" />
      </LogoLink>

      <Menu>
        <StyledLink to={`/`}>Home</StyledLink>
        <StyledLink to={`/search`}>Search</StyledLink>
        <StyledLink to={`/pick`}>Pick</StyledLink>
      </Menu>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${(props) =>
    props.show === "true" ? "#101010" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-item: center;
  padding: 1.6rem 6.4rem;
  z-index: 10;
`;

const LogoLink = styled(Link)`
  padding: 0;
  width: 15rem;

  img {
    height: 6.4rem;
  }
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 2.4rem;
  font-size: 2.4rem;
  transition: color 0.3s;

  &:hover {
    color: #8a2be2;
  }
`;
