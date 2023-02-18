import React from "react";
import LoginCard from "../components/LoginCard";
import {
  Box, Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Axios from "axios";
function LoginRoute() {
  React.useEffect(() => {
    document.title = "UPTIMESPY | Login";

    if (localStorage.getItem("token")) {
      Axios.post("http://localhost:5000/api/authenticate", null, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }).then((res) => {
        if ("JWT " + res.data.token === localStorage.getItem("token")) {
          window.location.href = "/dashboard";
        }
      }).catch((err) => {
      });
    }

  }, []);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [count, setCount] = React.useState(3);

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = () => {
    setIsSubmitting(true);
    Axios.post("http://localhost:5000/api/authenticate", {
      username: username,
      password: password,
    })
      .then((res) => {
        localStorage.setItem("token", "JWT " + res.data.token);
        setIsError(false);
        setSuccess(true);
        let newCount = count;
        const interval = setInterval(() => {
          newCount--;
          setCount((prev) => prev - 1);
          if (newCount === 0) {
            clearInterval(interval);
            window.location.href = "/dashboard";
          }
        }, 1000);

      }).catch((err) => {
        console.log(err)
        setError(err.response.data.message);
        setIsError(true);
        setIsSubmitting(false);
      });
  };

  return (
    <Box>
      {
        isError ? <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Oh no!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert> : null
      }
      {
        success ? <Alert status='success'>
          <AlertIcon />
          <AlertTitle>Yay!</AlertTitle>
          <AlertDescription>Successfully logged in. We are redirecting you in {count} seconds!</AlertDescription>
        </Alert> : null
      }
      <LoginCard submitHandler={submitHandler} isSubmitting={isSubmitting} usernameHandler={usernameHandler} passwordHandler={passwordHandler} />
    </Box>
  );
}

export default LoginRoute;
