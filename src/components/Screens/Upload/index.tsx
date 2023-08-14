// Libraries.

import { useState, useCallback } from "react";
import { Player } from "video-react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Dependencies.

import "./styled.css";
import {
  UploadFileToFirebase,
  UploadVideo,
} from "../../../utilities/BackendAPI";
import { commaSeparatedStringToArray } from "../../../utilities/helpers";

// Public.

// Renders the Upload Screen.
function UploadScreen() {
  // State.
  const [videoFile, setVideoFile] = useState<any>(null);
  const [tagsString, setTagsString] = useState("");
  const [emotions, setEmotions] = useState(["Happy", "Anger", "Sad"]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Callbacks.
  const onVideoFileUpload = useCallback(
    (e: any) => {
      setVideoFile(e.target.files[0]);
    },
    [videoFile]
  );

  const clearForm = () => {
    setVideoFile(null);
    setTagsString("");
    setSelectedEmotion("");
    setSource("");
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
      const videoDownloadURL = await UploadFileToFirebase(videoFile);
      const tags = commaSeparatedStringToArray(tagsString);
      const videoDataObject = {
        emotion: selectedEmotion,
        numberOfDownloads: 0,
        numberOfReports: 0,
        source,
        tags,
        title: videoFile?.name,
        videoDownloadURL,
      };
      const isVideoUploaded: boolean = await UploadVideo(videoDataObject);
      if (isVideoUploaded) {
        toast.success("Video uploaded successfully!");
      } else {
        toast.error("Failed to upload video!...");
      }
      setIsLoading(false);
      clearForm();
    } else {
      toast.warning("Please fill all the required fields!...");
    }
  };

  // Markup.
  return (
    <div className="project-MVC-UploadVideo-Container">
      <h3>Upload Video</h3>
      <fieldset disabled={isLoading} className="project-mvc-Video-Fieldset">
        <legend>Video</legend>
        <input required type="file" onChange={onVideoFileUpload} />
        {videoFile && (
          <Player
            playsInline
            src={URL.createObjectURL(videoFile)}
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
          <div>
            <label>Emotion</label>
            <Dropdown
              disabled={isLoading}
              options={emotions}
              onChange={onEmotionsSelect}
            />
          </div>
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
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
}

export default UploadScreen;
