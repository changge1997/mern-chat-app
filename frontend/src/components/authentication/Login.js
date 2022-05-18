import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const { login } = ChatState();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      login(data);
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleGoogle = async (googleUser) => {
    //const result = res?.profileObj;
    // const token = res?.tokenId;

    const id_token = googleUser.id_token;
    console.log(googleUser);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const result = await axios.post(
        "/api/user/google-login",
        JSON.stringify({
          token: id_token,
        }),
        config
      );

      const data = await result.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      login(data);
      history.push("/chats");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl name="email" id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl name="password" id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <GoogleLogin
        clientId="995299926946-utu88i48lst4d280mpb33vnojbmbp4nm.apps.googleusercontent.com"
        colorScheme="blue"
        render={(renderProps) => (
          <Button
            style={{ marginTop: 15 }}
            color="primary"
            width="100%"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant={"outline"}
          >
            <i className="fa-brands fa-google"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Google Sign In
            </Text>
          </Button>
        )}
        onSuccess={handleGoogle}
        onFailure={handleGoogle}
        cookiePolicy={"single_host_origin"}
        scope="https://www.googleapis.com/auth/cloud-platform"
      />

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
