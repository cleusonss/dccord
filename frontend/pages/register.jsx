import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  VStack,
  Stack,
} from "@chakra-ui/react";

import { Input } from "@chakra-ui/input";
import { useState, userEffect, useEffect } from "react";
import axios from "axios";
import api from "../services/api";

const { log } = console;

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      first_name: firstName,
      last_name: lastName,
      birth: birth,
      email: email,
      password: password,
    };

    // await api.get(`/users/${email}`).then((response) => {
    //   user.email = response.data.email;
    //   user.first_name = response.data.first_name;
    //   log("User: ", user);
    // });

    try {
    const res = await axios.post(
      "http://localhost:3001/register",
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then( (response)=>{
        console.log(response.data);
    });
    } catch (error) {
        console.log(error.message);
    }

    // try {

    //   axios({
    //     url: "http://localhost:3001/login",
    //     method: "GET",
    //     body: JSON.stringify(user),
    //   }).then((response) => {
    //     console.log(response.data);
    //   });
    // } catch (error) {
    //   log("Error: ", error);
    // }
  };

  return (
    <VStack
      as="form"
      mx="auto"
      w={{ base: "90%", md: 500 }}
      h="100vh"
      justifyContent="center"
    >
      <Heading> Registrar </Heading>

      <Box mt={20}>
        <Stack spacing={4}>
          <Input
            placeholder="Nome"
            value={firstName}
            onChange={({ target }) => setFirstName(target?.value)}
          />

          <Input
            placeholder="Sobrenome"
            value={lastName}
            onChange={({ target }) => setLastName(target?.value)}
          />

          <Input
            placeholder="dd/mm/aaaa"
            value={birth}
            onChange={({ target }) => setBirth(target?.value)}
          />

          <Input
            placeholder="meu@email.com"
            value={email}
            onChange={({ target }) => setEmail(target?.value)}
          />

          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target?.value)}
          />

          <Button type="submit" colorScheme="teal" onClick={handleSubmit}>
            Criar Conta
          </Button>
        </Stack>
      </Box>
    </VStack>
  );
}
