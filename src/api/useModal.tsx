import { useState } from "react";

type ModalHook = {
  isModalVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
  toggleModal: () => void;
};

const useModal = (initialVisible = false): ModalHook => {
  const [isModalVisible, setIsModalVisible] = useState(initialVisible);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const toggleModal = () => {
    setIsModalVisible((prevVisible) => !prevVisible);
  };

  return {
    isModalVisible,
    showModal,
    hideModal,
    toggleModal,
  };
};

export default useModal;
