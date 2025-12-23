"use client";

// 画像のドロップゾーンコンポーネント

import { Box, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

export default function ImageDropzone({
  onFile,
}: {
  onFile: (file: File) => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (files) => {
      const file = files[0];
      if (file) onFile(file);
    },
  });

  return (
    <Box
      {...getRootProps()}
      border="2px dashed #ccc"
      p={10}
      rounded="md"
      cursor="pointer"
    >
      <input {...getInputProps()} />
      
      <Text>
        {isDragActive ? "ここに画像をドロップしてください" : "クリック or ドラッグ＆ドロップ"}
      </Text>
    </Box>
  );
}
  