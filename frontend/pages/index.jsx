import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Image,
  HStack,
  Link,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Formik } from "formik";

export default function Home() {
  return (
    <Flex
      align="center"
      justify="start"
      h="100vh"
      flexDirection="column"
      pt={20}
    >
      <Box bg="white" p={6} rounded="md" w={300}>

        {/* Login */}
        {/* <Formik> */}
          <Input></Input>
          <Input></Input>
          <Button>Login</Button>
        {/* </Formik> */}

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
            <NextLink href="/cadastro" passHref>
              <Link textDecorationLine="none" _hover={{ color: "cyan.700" }}>
                Cadastrar
              </Link>
            </NextLink>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
}
