// Libraries.
import axios from "axios";
import { Storage } from ".././firebase";

const HOST = "http://localhost:3002";

export const UploadFileToFirebase = async (file: any) => {
  const storageRef = Storage.ref();
  const fileRef = storageRef.child(file.name);

  try {
    const snapshot = await fileRef.put(file);
    console.log("File uploaded:", snapshot);

    // Get the download URL of the uploaded file
    const downloadURL = await fileRef.getDownloadURL();
    console.log("Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const UploadVideo = async (data: any) => {
  const res = await axios.post(`${HOST}/addNewVideo`, data);
  console.log("Res", res);
};
