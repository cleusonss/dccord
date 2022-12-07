import {
  Box,
  Button,
  HStack,
  Link,
  Heading,
  VStack,
  Stack,
  Input,
  Toast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import api from "../services/api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await api
        .post("/signin", JSON.stringify({ email, password }), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.url);

          router.push("/chatpage");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSign = async (values) => {
    const res = await signIn("Credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    if (res?.error) {
      Toast({
        title: `${res.error}`,
        statis: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    console.log(res.url);
    // if (res.url) 
    router.push("/chatpage");
  };

  return (
    <VStack
      as="form"
      mx="auto"
      w={{ base: "90%", md: 500 }}
      h="100vh"
      justifyContent="center"
    >
      <Heading> Login </Heading>

      {/* Login */}
      <Box mt={20}>
        <Stack spacing={4}>
          <Input
            placeholder="Email"
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target?.value)}
          />

          <Input
            placeholder="Senha"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target?.value)}
          />

          <Button type="submit" colorScheme="teal" onClick={handleSubmit}>
            Entrar
          </Button>
        </Stack>

        {/* Esqueci a Senha e Cadastro */}
        <HStack
          w="full"
          justifyContent="space-between"
          fontSize="sm"
          fontWeight="bold"
          color="cyan.400"
        >
          {/* Esqueci a Senha */}
          <Box>
            <NextLink href="#" passHref>
              <Link textDecorationLine="none" _hover={{ color: "cyan.700" }}>
                Esqueceu a senha
              </Link>
            </NextLink>
          </Box>

          {/* Cadastro */}
          <Box>
            <NextLink href="/signup" passHref>
              <Link textDecorationLine="none" _hover={{ color: "cyan.700" }}>
                Cadastrar
              </Link>
            </NextLink>
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
}
