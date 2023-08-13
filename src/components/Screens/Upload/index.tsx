// Libraries.

import { useState, useCallback } from "react";
import { Player } from "video-react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

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
  const [thumbnailFile, setThumbnailFile] = useState(null);
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

  const onThumbnailUpload = useCallback(
    (e: any) => {
      setThumbnailFile(e.target.files[0]);
    },
    [thumbnailFile]
  );

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
    setIsLoading(true);
    const videoDownloadURL = await UploadFileToFirebase(videoFile);
    const thumbnailDownloadURL = await UploadFileToFirebase(thumbnailFile);
    const tags = commaSeparatedStringToArray(tagsString);
    const videoDataObject = {
      emotion: selectedEmotion,
      numberOfDownloads: 0,
      numberOfReports: 0,
      source,
      tags,
      thumbnailDownloadURL,
      title: videoFile?.name,
      videoDownloadURL,
    };
    const videoUploadResult = await UploadVideo(videoDataObject);
    setIsLoading(false);
  };

  // Markup.
  return (
    <div className="project-MVC-UploadVideo-Container">
      <h3>Upload Video</h3>
      <fieldset disabled={isLoading} className="project-mvc-Video-Fieldset">
        <legend>Video</legend>
        <input type="file" onChange={onVideoFileUpload} />
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
          <textarea value={tagsString} onChange={onTagsChange} />
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
              className="source"
              value={source}
              type="text"
              onChange={onSourceChange}
              placeholder="Enter the video source..."
            />
          </div>
        </div>
      </fieldset>
      <fieldset disabled={isLoading} className="project-mvc-Thumbnail-Fieldset">
        <legend>Thumbnail</legend>
        <input type="file" onChange={onThumbnailUpload} />
        {thumbnailFile && (
          <img src={URL.createObjectURL(thumbnailFile)} height={500} />
        )}
      </fieldset>
      <div className="project-mvc-UploadButton-Container">
        <button onClick={onUpload} disabled={isLoading}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadScreen;
