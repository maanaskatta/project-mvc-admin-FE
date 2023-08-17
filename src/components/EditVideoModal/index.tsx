// Dependencies.
import Modal from "react-modal";
import UploadScreen from "../Screens/Upload";

// Public.

function EditVideoModal({ isModalOpen, closeModal, videoData }: any) {
  // State.
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "80%",
      maxHeight: "80%",
      overflow: "scroll",
      backgroundColor: "white",
      opacity: 1,
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Callbacks.

  // Markup.
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}>
      <div>
        <UploadScreen isEditing={true} videoData={videoData} />
      </div>
    </Modal>
  );
}

export default EditVideoModal;
