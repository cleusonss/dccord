import { Box, Button, Heading, VStack, Stack } from "@chakra-ui/react";

import { Input } from "@chakra-ui/input";
import { useState } from "react";
import api from "../services/api";
import { useRouter } from "next/router";


const { log } = console;

export default function SignUp() {
  
  const router = useRouter();

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
      const res = await api
        .post("/signup", JSON.stringify(user), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          router.push("/chatpage");
        });
    } catch (error) {
      log(error.message);
    }
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
