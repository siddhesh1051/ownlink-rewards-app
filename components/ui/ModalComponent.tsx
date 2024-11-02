import React from "react";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./modal";
import { CloseIcon, Icon } from "./icon";
import { Button, ButtonText } from "./button";
import { Text } from "./text";
import { Heading } from "./heading";
import { View } from "react-native";
import { Center } from "./center";
import AnimationScratchCard from "../AnimationScratchCard ";

const ModalComponent = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      size="lg"
    >
      <ModalBackdrop
        animate={{
          opacity: 0.8,
        }}
      />
      <ModalContent
        style={{
          backgroundColor: "transparent",
          borderWidth: 0,
        }}
      >
        <ModalHeader
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 16,
          }}
        >
          <ModalCloseButton
            onPress={() => {
              setIsModalOpen(false);
            }}
          >
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-50 group-hover:stroke-background-700 group-active:stroke-background-900 group-focus-visible:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="py-4">
          <AnimationScratchCard setIsModalOpen={setIsModalOpen} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
