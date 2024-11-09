import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "./modal";
import { CloseIcon, Icon } from "./icon";
import AnimationScratchCard from "../AnimationScratchCard ";
import { ScratchCard } from "@/models";

const ModalComponent = ({
  isModalOpen,
  setIsModalOpen,
  selectedScratchCard,
  toggleRefresh,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedScratchCard: ScratchCard | undefined;
  toggleRefresh: () => void;
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
          <AnimationScratchCard
            setIsModalOpen={setIsModalOpen}
            selectedScratchCard={selectedScratchCard}
            toggleRefresh={toggleRefresh}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
