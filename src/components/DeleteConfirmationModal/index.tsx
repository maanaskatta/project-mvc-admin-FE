// Dependencies.
import Modal from "react-modal";
import "./styled.css";
import { useCallback, useState } from "react";

// Public.
function DeleteConfirmationModal({ isModalOpen, closeModal, onConfirm }: any) {
  const [isLoading, setIsLoading] = useState(false);
  // State.
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      backgroundColor: "white",
      opacity: 1,
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Callbacks.
  const handleConfirm = useCallback(() => {
    setIsLoading(true);
    onConfirm();
  }, [isLoading]);

  // Markup.
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}>
      <div>
        <h3>Do you want to delete the video?</h3>
        <div className="project-mvc-DeleteModal-Controls">
          <button disabled={isLoading} onClick={closeModal}>
            Cancel
          </button>
          <button
            disabled={isLoading}
            className="delete"
            onClick={handleConfirm}>
            {isLoading ? "Please wait..." : "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
