"use client";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import NextLink from "next/link";

// メニュー項目の定義（ここでドロアーの項目とリンク先を対応させる）
const MENU_ITEMS = [
  { label: "スタート", href: "/" },
  { label: "アップロード", href: "/upload" },
  { label: "リスト", href: "/list" },
];

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <Box>
      {/* ハンバーガーボタン */}
      <Button ref={btnRef} onClick={onOpen} aria-label="Open Menu">
        <HamburgerIcon />
      </Button>

      {/* ドロアー */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Box mt={10}>
              {MENU_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  as={NextLink}
                  // asはコンポーネントを別のコンポーネントとして振る舞わせる指定
                  // NextLinkコンポーネントはページを遷移するためのリンク
                  href={item.href}
                  w="100%"
                  mb={4}
                  onClick={onClose}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
