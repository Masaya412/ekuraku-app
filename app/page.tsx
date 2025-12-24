"use client";

import { Box, Button, VStack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function StartPage() {
  return (
    <Box>
      <VStack justify="center" minH="100vh">
        <VStack spacing={6}>
          <Text fontSize={"50px"} fontWeight={"bold"} color={"deepskyblue"}>
            主要色抽出アプリ えくらく
          </Text>
          <Button
            as={NextLink} 
            href="/upload"
            borderRadius={"full"}
            color={"white"}
            background={"deepskyblue"}
            width={"210px"}
            height={"50px"}
            fontSize={"25px"}
            _hover={{ background: "skyblue" }}
          >
            クリック
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
