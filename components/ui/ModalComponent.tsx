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
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Heading size="xl">Scratch To Win</Heading>
        </ModalHeader>
        <ModalBody className="py-4">
          <AnimationScratchCard />
        </ModalBody>
        <ModalFooter
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              setIsModalOpen(false);
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            onPress={() => {
              setIsModalOpen(false);
            }}
          >
            <ButtonText>Auto Scratch</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
