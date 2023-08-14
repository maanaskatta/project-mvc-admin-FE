import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./index.css";

const Loading = ({ isSearching }: any) => {
  return (
    <div className="project-mvc-Loading-Container">
      <AiOutlineLoading3Quarters
        className={`${isSearching ? "isLoading" : ""}`}
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
