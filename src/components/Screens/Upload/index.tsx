// Libraries.

import { useState, useCallback, useEffect } from "react";
import { Player } from "video-react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Dependencies.

import "./styled.css";
import {
  EditVideo,
  GetEmotions,
  UploadFileToFirebase,
  UploadVideo,
} from "../../../utilities/BackendAPI";
import { commaSeparatedStringToArray } from "../../../utilities/helpers";

// Public.

// Renders the Upload Screen.
function UploadScreen({ isEditing = false, videoData = null }: any) {
  // State.
  const [videoFile, setVideoFile] = useState<any>(
    videoData ? videoData.videoDownloadURL : null
  );
  const [tagsString, setTagsString] = useState(
    videoData ? videoData.tags.join(",") : ""
  );
  const [emotions, setEmotions] = useState<string[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState(
    videoData ? videoData.emotion : ""
  );
  const [source, setSource] = useState(videoData ? videoData.source : "");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormEditted, setIsFormEditted] = useState(false);

  // Callbacks.
  const onVideoFileUpload = useCallback(
    (e: any) => {
      setIsFormEditted(true);
      setVideoFile(e.target.files[0]);
    },
    [videoFile]
  );

  const clearForm = () => {
    setVideoFile(null);
    setTagsString("");
    setSelectedEmotion("");
    setSource("");
    setIsFormEditted(false);
  };

  const onTagsChange = useCallback(
    (e: any) => {
      setTagsString(e.target.value);
    },
    [tagsString]
  );

  const onEmotionsSelect = useCallback(
    (option: any) => {
      setSelectedEmotion(option.value);
    },
    [selectedEmotion]
  );

  const onSourceChange = useCallback(
    (e: any) => {
      setSource(e.target.value);
    },
    [source]
  );

  const onUpload = async () => {
    if (
      videoFile &&
      tagsString.length > 0 &&
      selectedEmotion.length > 0 &&
      source.length > 0
    ) {
      setIsLoading(true);
      let videoDownloadURL: string | undefined = "";
      if (isFormEditted) {
        videoDownloadURL = await UploadFileToFirebase(videoFile);
      }
      const tags = commaSeparatedStringToArray(tagsString);
      const videoDataObject = {
        ...(isEditing && videoData && { id: videoData.id }),
        emotion: selectedEmotion,
        numberOfDownloads: videoData ? videoData.numberOfDownloads : 0,
        numberOfReports: videoData ? videoData.numberOfReports : 0,
        source,
        tags,
        title: videoFile?.name,
        videoDownloadURL:
          videoData && !isFormEditted
            ? videoData.videoDownloadURL
            : videoDownloadURL,
      };

      const isVideoUploaded: boolean = isEditing
        ? await EditVideo(videoDataObject)
        : await UploadVideo(videoDataObject);
      if (isVideoUploaded) {
        toast.success(
          `Video ${isEditing ? "updated" : "uploaded"} successfully!`
        );
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "upload"} video!...`);
      }
      setIsLoading(false);
      clearForm();
      if (isEditing) {
        window.location.reload();
      }
    } else {
      toast.warning("Please fill all the required fields!...");
    }
  };

  const fetchEmotions = async () => {
    const localEmotions = localStorage.getItem("emotions");
    if (localEmotions) {
      setEmotions(JSON.parse(localEmotions));
    } else {
      const res = await GetEmotions();
      setEmotions(res);
      localStorage.setItem("emotions", JSON.stringify(res));
    }
  };

  // Setup and Teardown.
  useEffect(() => {
    fetchEmotions();
  }, []);

  // Markup.
  return (
    <div
      className="project-MVC-UploadVideo-Container"
      style={{ padding: isEditing ? "1rem 2rem" : "1rem 10rem" }}>
      <h3>{isEditing ? "Update" : "Upload"} Video</h3>
      <fieldset disabled={isLoading} className="project-mvc-Video-Fieldset">
        <legend>Video</legend>
        <input required type="file" onChange={onVideoFileUpload} />
        {videoFile && (
          <Player
            playsInline
            src={
              videoData && !isFormEditted
                ? videoFile
                : URL.createObjectURL(videoFile)
            }
            fluid={false}
            height={500}
            width={800}
          />
        )}
      </fieldset>
      <fieldset disabled={isLoading} className="project-mvc-VideoTags-Fieldset">
        <legend>Descriptors</legend>
        <div>
          <label>Tags</label>
          <textarea required value={tagsString} onChange={onTagsChange} />
        </div>
        <div className="emotion-source-container">
          {emotions.length > 0 ? (
            <div>
              <label>Emotion</label>
              <Dropdown
                value={selectedEmotion}
                disabled={isLoading}
                options={emotions}
                onChange={onEmotionsSelect}
              />
            </div>
          ) : (
            <p>Waiting for emotions...</p>
          )}
          <div>
            <label>Source</label>
            <input
              required
              className="source"
              value={source}
              type="text"
              onChange={onSourceChange}
              placeholder="Enter the video source..."
            />
          </div>
        </div>
      </fieldset>

      <div className="project-mvc-UploadButton-Container">
        <button onClick={onUpload} disabled={isLoading}>
          {isLoading ? (
            <AiOutlineLoading3Quarters
              className={isLoading ? "isLoading" : ""}
            />
          ) : isEditing ? (
            "Update"
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
}

export default UploadScreen;
