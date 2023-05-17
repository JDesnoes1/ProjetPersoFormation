import "./formationDetails.scss";
import DetailsFormations from "../../composants/DetailsFormations/DetailsFormations";
import { useLocation } from "react-router-dom";

const FormationDetails = () => {
  const idFormation = parseInt(useLocation().pathname.split("/")[2]);
  return (
    <div>
      <DetailsFormations formationId={idFormation} />
    </div>
  );
};

export default FormationDetails;
