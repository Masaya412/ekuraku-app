"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { extractColors } from "./colorExtractor";
import { fileToImage } from "./fileToImage";
import ImageDropzone from "./ImageDropzone";
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
  // localStorageではなく、sessionStorageにすることで、ページが閉じると履歴が削除される
  sessionStorage.setItem(HISTRY_KEY, JSON.stringify(item));
}

export default function UploadPage() {
  const [colors, setColors] = useState<string[]>([]);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploadedOnce, setUploadedOnce] = useState(false);

  const onFile = async (file: File) => {
    // 画像のプレビュー表示
    const url = URL.createObjectURL(file);
    setPreviewURL((prev) => {
      if (prev) URL.revokeObjectURL(prev); // 前のプレビューを解放
      return url;
    });

    // 色の抽出
    const img = await fileToImage(file);
    const colors = extractColors(img, 3);
    setColors(colors);

    // 履歴の保存
    const savedItem: HistoryItem = {
      id: crypto.randomUUID(), // オリジナルのIDを生成
      createdAt: Date.now(), // 作られた時間を取得
      imageDataURL: url, // アップロードした画像のURLを保存
      colors: colors, // 抽出した色を保存
    };

    const history = loadHistory();
    saveHistory([savedItem, ...history].slice(0, 10)); // 最新10件を保存

    // アップロード済みにする関数（ドロップゾーンをなくすため）
    setUploadedOnce(true);
  };

  // 画像と色の削除
  const remove = () => {
    setColors([]);
    setPreviewURL(null);
    sessionStorage.removeItem(HISTRY_KEY);
    setUploadedOnce(false); // 削除したらドロップゾーンを再表示
  };

  return (
    <Box textAlign="center" p={6}>
      <VStack spacing={6}>
        <Heading fontSize="50px" color="blue.500">
          カラー抽出ページ
        </Heading>
        {/* アップロードがされていないときのみドロップゾーンを表示 */}
        {!uploadedOnce && <ImageDropzone onFile={onFile} />}
        <HStack spacing={10} mt={4}>
          {/* プレビュー表示 */}

          {/* 画像の表示 */}
          {uploadedOnce && previewURL && (
            <Box w="100%" maxW="480px">
              <Image
                src={previewURL}
                alt="選択した画像"
                w="100%"
                maxH="280px"
                objectFit="contain"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                boxShadow="md"
              />
            </Box>
          )}
          <HStack spacing={3} mt={4}>
            {/* 色の表示 */}
            {colors.map((color, index) => (
              <VStack key={index}>
                <Box
                  background={color}
                  w="100px"
                  h="100px"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="md"
                />
                <Text key={index}>{`${index + 1} 番`}</Text>
              </VStack>
            ))}
          </HStack>
        </HStack>
        <HStack justify="center" spacing={4}>
          <Button
            onClick={remove}
            isDisabled={!previewURL && colors.length === 0}
            variant="outline"
            colorScheme="red"
          >
            画像を削除
          </Button>
          <Button as={NextLink} href="/list" colorScheme="green">
            リストページへ
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
