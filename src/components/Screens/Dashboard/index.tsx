import { useCallback, useEffect, useState } from "react";
import { GetAllVideos, GetSearchedVideos } from "../../../utilities/BackendAPI";
import "./styled.css";
import { Player } from "video-react";
import { AiOutlineSearch } from "react-icons/ai";
import Loading from "../../Loading";
import Video from "../../Video";

export interface Video {
  numberOfReports: number;
  numberOfDownloads: number;
  videoDownloadURL: string;
  source: string;
  title: string;
  emotion: string;
  tags: string[];
  id: string;
}

// Renders the Dashboard Screen.
function Dashboard() {
  // State.
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmptySearchResults, setIsEmptySearchResults] = useState(false);
  let searchTimeout: any;
  // Callbacks.
  const fetchAllVideos = useCallback(async () => {
    setIsLoading(true);
    const temp: Video[] = await GetAllVideos();
    setIsLoading(false);

    if (temp.length) {
      setVideos(temp);
    }
  }, [videos]);

  // Setup and Teardown.
  useEffect(() => {
    fetchAllVideos();
  }, []);

  // Callbacks.
  const handleSearch = useCallback((e: any) => {
    const searchValue = e.target.value.trim(); // Remove leading/trailing whitespace
    setSearchTerm(searchValue);

    setIsSearching(true);
    setIsEmptySearchResults(false);

    clearTimeout(searchTimeout); // Clear any previous timeouts

    searchTimeout = setTimeout(async () => {
      if (!searchValue) {
        setIsSearching(false);
        setVideos(await GetAllVideos());
      } else {
        const searchedVideos = await GetSearchedVideos(searchValue);
        setIsSearching(false);

        if (searchedVideos.length > 0) {
          setVideos(searchedVideos);
        } else {
          setIsEmptySearchResults(true);
        }
      }
    }, 750);
  }, []);
  // Markup.
  return (
    <div className="project-mvc-Dashboard-Container">
      <p>Dashboard</p>

      <div className="project-mvc-SearchBox-Container">
        <AiOutlineSearch size={20} className="search-icon" />
        <input
          type="text"
          className="project-mvc-SearchBox"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>

      {!isSearching && !isLoading ? (
        !isEmptySearchResults ? (
          <div className="project-mvc-Videos-Container">
            {videos.length ? (
              videos.map((video) => <Video video={video} />)
            ) : (
              <p>No videos found...</p>
            )}
          </div>
        ) : (
          <p>No search results found...</p>
        )
      ) : (
        <div className="project-mvc-Dashboard-Loading-Container">
          <Loading isSearching={isSearching} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
