import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Checkbox,
  Image,
  HStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import Alerts from "../components/_ui/Alerts";
import fetch from "unfetch";

const newLocal =
  process.env.NODE_ENV === "production"
    ? process.env.API_URI_CLOUD
    : process.env.API_URI_LOCAL;
const API_URI = newLocal;

export default function Cadastro() {
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <Flex
      align="center"
      justify="start"
      h="100vh"
      flexDirection="column"
      pt={20}
    >
      <Box w={60} pb={5}>
        <Image src="/images/logo-full.png" alt="logo" />
      </Box>

      <Box bg="white" p={6} rounded="md" w={400}>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            birth: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const newUser = {
              first_name: values.first_name,
              last_name: values.last_name,
              birth: values.birth,
              email: values.email,
              password: values.password,
            };

            fetch(`${API_URI}/register`, {
              method: "POST",
              body: JSON.stringify(newUser),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
              },
            })
              .then((response) => response.json())
              .then((json) => {
                if (json)
                  router.push(
                    {
                      pathname: "/",
                      query: {
                        type: "ok",
                        msg: "Cadastro realizado com sucesso!",
                      },
                    },
                    "/"
                  );
              })
              .catch((err) => setError(err));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <HStack>
                  <FormControl>
                    <FormLabel htmlFor="first_name">Nome</FormLabel>
                    <Field
                      as={Input}
                      id="first_name"
                      name="first_name"
                      type="text"
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="last_name">Sobrenome</FormLabel>
                    c
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel htmlFor="birth">Data de Nascimento</FormLabel>
                  <Field
                    as={Input}
                    id="birth"
                    name="birth"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                  />
                </FormControl>
                <Button
                  type="submit"
                  width="full"
                  color="white"
                  bg="brand.600"
                  _hover={{ bg: "brand.700" }}
                >
                  Cadastrar
                </Button>
                <Button
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/",
                        query: {
                          type: "",
                          msg: "",
                        },
                      },
                      "/"
                    )
                  }
                  width="full"
                  color="teal"
                  variant="outline"
                >
                  Cancel
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
