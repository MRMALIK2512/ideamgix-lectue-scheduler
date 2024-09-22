import React from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";

export default function Welcome({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <WelcomeContainer>
      <TopBar>
        <Heading>ADMIN PANEL</Heading>
        <Logout />
      </TopBar>
      <MainContent>
        <InstructorsContainer>
          <Instructors user={user} />
        </InstructorsContainer>
        <CoursesContainer>
          <Courses user={user} />
        </CoursesContainer>
      </MainContent>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e0f7fa; /* Light Cyan */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 100%;
  width: 100%;
  padding: 1rem; /* Added padding for better spacing */
`;

const InstructorsContainer = styled.div`
  width: 40%;

  color: #333; /* Dark Gray */
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Added shadow for depth */
`;

const CoursesContainer = styled.div`
  width: 60%;

  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Added shadow for depth */
`;

const TopBar = styled.div`
  width: 100%;
  background: #00796b; /* Teal */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items vertically in the center */
`;

const Heading = styled.h1`
  color: #ffffff; /* White */
  font-size: 28px;
  font-weight: bold;
  margin: 0; /* Removed margin to align better */
`;
