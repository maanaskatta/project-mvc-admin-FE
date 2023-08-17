// Libraries.
import axios from "axios";
import { Storage } from ".././firebase";
import { Video } from "../components/Screens/Dashboard";

const HOST = "https://project-mvc-memifi-3462093bfecd.herokuapp.com";
const EMOTIONSGITHUBGIST =
  "https://gist.githubusercontent.com/maanaskatta/ddfe24cb5102445e8639a9b453ce6d03/raw/5ce0f9f6f53ea7ad7667c754f645bfa6277ac03c/gistfile1.txt";

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

export const UploadVideo = async (data: any): Promise<boolean> => {
  const res: boolean = await axios.post(`${HOST}/addNewVideo`, data);
  return res;
};

export const EditVideo = async (data: any): Promise<boolean> => {
  const res: boolean = await axios.post(`${HOST}/updateVideo`, data);
  return res;
};

export const GetAllVideos = async (): Promise<Video[]> => {
  const res = await axios.get(`${HOST}/getAllVideos`);
  return res.data;
};

export const GetSearchedVideos = async (
  searchTerm: string
): Promise<Video[]> => {
  const res = await axios.post(`${HOST}/getSearchedVideos`, { searchTerm });
  return res.data;
};

export const DeleteVideo = async (id: any): Promise<boolean> => {
  const res: boolean = await axios.post(`${HOST}/deleteVideo`, { id });
  return res;
};

export const GetEmotions = async (): Promise<string[]> => {
  const res = await axios.get(EMOTIONSGITHUBGIST);
  return res.data;
};
