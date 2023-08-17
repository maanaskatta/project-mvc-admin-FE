// Dependencies.
import { Player } from "video-react";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import "./styled.css";
import { useCallback, useState } from "react";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { DeleteVideo } from "../../utilities/BackendAPI";
import { toast } from "react-toastify";
import EditVideoModal from "../EditVideoModal";

// Public.

function Video({ video }: any) {
  // State.
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [isEditVideoModalOpen, setIsEditVideoModalOpen] = useState(false);

  // Callbacks.
  const openDeleteConfirmationModal = useCallback(() => {
    setIsDeleteConfirmationModalOpen(true);
  }, [isDeleteConfirmationModalOpen]);

  const closeDeleteConfirmationModal = useCallback(() => {
    setIsDeleteConfirmationModalOpen(false);
  }, [isDeleteConfirmationModalOpen]);

  const openEditVideoModal = useCallback(() => {
    setIsEditVideoModalOpen(true);
  }, [isEditVideoModalOpen]);

  const closeEditVideoModal = useCallback(() => {
    setIsEditVideoModalOpen(false);
  }, [isEditVideoModalOpen]);

  const onDelete = async () => {
    const res = await DeleteVideo(video.id);
    if (res) {
      toast.success("Video deleted successfully!...");
      closeDeleteConfirmationModal();
      window.location.reload();
    } else {
      toast.error("Failed to delete the video");
    }
  };
  // Markup.
  return (
    <div className="project-mvc-Video">
      <p>{video.title}</p>
      <Player
        playsInline
        src={video.videoDownloadURL}
        fluid={false}
        height={200}
        width={350}
      />
      <div className="project-mvc-Video-Controls">
        <BsPencilFill
          color="darkorange"
          onClick={openEditVideoModal}
          size={16}
        />
        <BsTrashFill
          color="red"
          onClick={openDeleteConfirmationModal}
          size={16}
        />
      </div>
      <DeleteConfirmationModal
        isModalOpen={isDeleteConfirmationModalOpen}
        closeModal={closeDeleteConfirmationModal}
        onConfirm={onDelete}
      />
      <EditVideoModal
        isModalOpen={isEditVideoModalOpen}
        closeModal={closeEditVideoModal}
        videoData={video}
      />
    </div>
  );
}

export default Video;
