import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, [navigate]);

  return (
    <MainContainer>
      <Navbar>
        <Brand>Ideamagix</Brand>
        <NavButtons>
          <NavButton onClick={() => navigate("/login")}>Login</NavButton>
          <NavButton onClick={() => navigate("/register")}>Register</NavButton>
        </NavButtons>
      </Navbar>
      <Content>
        <WelcomeMessage>
          Streamline Your Teaching: Schedule Courses with Ease! <br />
          Ensure Instructors Have One Course Per Day.
        </WelcomeMessage>
      </Content>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
  padding: 20px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #00796b; /* Teal */
  border-radius: 5px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Brand = styled.h1`
  color: white;
  font-size: 24px;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 20px; /* Smaller font on mobile */
  }
`;

const NavButtons = styled.div`
  display: flex;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-around; /* Space out buttons on mobile */
    margin-top: 10px;
  }
`;

const NavButton = styled.button`
  padding: 10px 15px;
  background: transparent;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 600px) {
    margin-left: 0; /* Remove left margin on mobile */
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeMessage = styled.h1`
  font-size: 32px;
  color: #004d40; /* Darker teal */
  text-align: center;

  @media (max-width: 600px) {
    font-size: 24px; /* Smaller font size on mobile */
  }
`;

export default Main;
