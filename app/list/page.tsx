"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";

type HistoryItem = {
  id: string;
  createdAt: number;
  imageDataURL: string;
  colors: string[];
};

const HISTRY_KEY = "HistoryItems";

// 履歴の読み込み
function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(sessionStorage.getItem(HISTRY_KEY) || "[]");
  } catch {
    return [];
  }
}

// 履歴の保存
function saveHistory(item: HistoryItem[]) {
  sessionStorage.setItem(HISTRY_KEY, JSON.stringify(item));
}

export default function ListPage() {
  // デプロイ用（最後のButtonのルーティングに使用）
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 初回読み込み（これがないとずっと空のままになってしまう）
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // 1つ削除
  const remove = (id: string) => {
    const uploaded = history.filter((h) => h.id !== id);
    setHistory(uploaded);
    saveHistory(uploaded);
  };

  // 全削除
  const removeAll = () => {
    setHistory([]);
    sessionStorage.removeItem(HISTRY_KEY);
  };

  return (
    <Box textAlign="center" p={6}>
      <VStack spacing={6}>
        <Heading fontSize="50px" color="blue.500">
          リストページ
        </Heading>

        {history.length === 0 ? (
          <Text color="gray.500">保存された画像はありません</Text>
        ) : (
          <VStack spacing={6} align="center">
            {history.map((h) => (
              <Box
                key={h.id}
                p={4}
                w="100%"
                borderColor="gray"
                borderWidth="1px"
                textAlign="center"
                background={"white"}
                bgGradient="linear(to-r, gray.100, blue.100)"
                boxShadow="md"
                borderRadius="md"
              >
                <HStack spacing={4} p={4} justify="center">
                  {/* 画像の表示 */}
                  <Image
                    src={h.imageDataURL}
                    alt="Uploaded Image"
                    boxSize="200px"
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="md"
                  />

                  {/* 色の表示 */}
                  <HStack spacing={4}>
                    {h.colors.map((color, index) => (
                      <VStack key={index} spacing={2}>
                        <Box
                          background={color}
                          w="60px"
                          h="60px"
                          borderRadius="md"
                          border="1px"
                          boxShadow="md"
                        />
                        <Text key={index}>{`${index + 1} 番`}</Text>
                      </VStack>
                    ))}
                  </HStack>
                </HStack>

                <Button mt={4} colorScheme="red" onClick={() => remove(h.id)}>
                  削除
                </Button>
              </Box>
            ))}
          </VStack>
        )}

        {/* データがあるときのみ全削除ボタンを表示 */}
        {history.length === 0 ? null : (
          <Button onClick={removeAll} colorScheme="yellow">
            全削除
          </Button>
        )}
        <Box h="20px" />
        
        <Button as={NextLink} href={`${basePath}/upload`} colorScheme="green">
          アップロードページに戻る
        </Button>
      </VStack>
    </Box>
  );
}
