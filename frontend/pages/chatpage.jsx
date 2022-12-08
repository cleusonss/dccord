import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

import { Box, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import LeftSideBar from "../components/LeftSideBar";
import Chat from "../components/Chat";


const { log } = console;
const API = "http://localhost:3001";

export default function ChatPage() {
  const router = useRouter();
  const { data: session } = useSession();
  //   const [emailUser, setEmailUser] = useState(session.user.email);
  const [userData, setUserData] = useState("");

  return (
    <HStack h="100vh" spacing={0}>
      {/* Navbar */}
      <Flex as="nav" h="full" maxW={16} w="full" bg="gray.100">
        {/* <Navigation /> */}
      </Flex>

      {/* LeftSidebar */}
      <Flex
        as="aside"
        h="full"
        maxW="sm"
        w="full"
        bg="white"
        borderRightColor="gray.100"
        borderRightWidth={1}
        pt={8}
        justifyContent="center"
      >
        {/* <LeftSideBar onChatPrivadoOpen={onChatPrivadoOpen} /> */}
        <LeftSideBar />
      </Flex>

      {/* Private Chat */}
      <Flex
        as="main"
        h="full"
        flex={1}
        borderRightColor="gray.100"
        borderRightWidth={1}
      >
        {/* <Chat onChatPrivadoOpen={onChatPrivadoOpen} /> */}
        <Chat />
      </Flex>

      {/* <ChatPrivadoDrawer */}
      {/* isOpen={isChatPrivadoOpen} */}
      {/* onClose={onChatPrivadoClose} */}
      {/* /> */}
    </HStack>
  );
}
