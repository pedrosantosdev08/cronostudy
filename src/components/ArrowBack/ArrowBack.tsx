import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export const ArrowBack = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="text-neutral-500 hover:text-neutral-300 flex items-center mb-2 transition duration-150"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      <span>Voltar</span>
    </div>
  );
};
