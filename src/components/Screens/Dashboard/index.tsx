import { useCallback, useEffect, useState } from "react";
import { GetAllVidoes, GetSearchedVidoes } from "../../../utilities/BackendAPI";
import "./styled.css";
import { Player } from "video-react";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import Loading from "../../Loading";

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
  const [isEmptySearchResults, setIsEmptySearchResults] = useState(false);
  // Callbacks.
  const fetchAllVideos = useCallback(async () => {
    const temp: Video[] = await GetAllVidoes();

    if (temp.length) {
      setVideos(temp);
    }
  }, [videos]);

  // Setup and Teardown.
  useEffect(() => {
    fetchAllVideos();
  }, []);

  // Callbacks.
  const handleSearch = useCallback(
    (e: any) => {
      setIsEmptySearchResults(false);
      setSearchTerm(e.target.value);
      setIsSearching(true);
      setVideos([]);
      setTimeout(async () => {
        const searchedVideos = e.target.value
          ? await GetSearchedVidoes(e.target.value)
          : await GetAllVidoes();
        if (searchedVideos.length) {
          setVideos(searchedVideos);
        } else {
          setIsEmptySearchResults(true);
        }
        setIsSearching(false);
      }, 500);
    },
    [searchTerm]
  );

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

      {!isSearching ? (
        !isEmptySearchResults ? (
          <div className="project-mvc-Videos-Container">
            {videos.map((video) => (
              <div className="project-mvc-Video">
                <Player
                  playsInline
                  src={video.videoDownloadURL}
                  fluid={false}
                  height={200}
                  width={350}
                />
                <p>{video.title}</p>
              </div>
            ))}
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
