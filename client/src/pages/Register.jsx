import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        isAdmin: values.isAdmin,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        if (data.user.isAdmin === true) {
          localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
          navigate("/admin");
        } else if (data.user.isAdmin === false) {
          localStorage.setItem("secret-key", JSON.stringify(data.user));
          navigate("/instructor");
        }
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: newValue });
  };

  return (
    <FormContainer onSubmit={(event) => handleSubmit(event)}>
      <Navbar>
        <Logo>Ideamagix</Logo>
        <NavButton onClick={() => navigate("/login")}> Go to Login</NavButton>
      </Navbar>
      <div className="brand">
        <h1>SIGN UP</h1>
      </div>
      <form>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <div className="checkbox-container">
          <Checkbox
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={values.isAdmin}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="isAdmin">Admin</label>
        </div>
        <SubmitButton type="submit">Create User</SubmitButton>
        <span>
          Already have an account? <Link to="/login">Login.</Link>
        </span>
      </form>
      <ToastContainer />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2); /* Matching gradient */
  padding: 2rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: #00796b; /* Matching teal color */
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff; /* Silken Ivory */
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  span {
    color: #00796b; /* Matching teal color */
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem;

    a {
      color: red; /* Turquoise */
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Navbar = styled.nav`
  width: 100%;
  display: flex;

  justify-content: space-between;
  align-items: center;
  background-color: #00796b; /* Teal */
  padding: 10px 20px;
  border-radius: 5px;
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin: 0;
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
`;


const Input = styled.input`
  padding: 1rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.3)c;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;
  color: #333;

  &:focus {
    border: 0.1rem solid #00796b;
    outline: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #00796b;
  color: white;
  padding: 1rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-transform: uppercase;

  &:hover {
    background-color: #004d40;
  }

`;
