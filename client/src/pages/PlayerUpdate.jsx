import { useLoaderData } from "react-router-dom";
import { CreateOrUpdatePlayerForm } from "../components/CreateOrUpdatePlayerForm";

const PlayerUpdate = () => {
  const { data } = useLoaderData();
  const player = data.data;

  return (
    <div>
      <CreateOrUpdatePlayerForm player={player} />
    </div>
  );
};

export default PlayerUpdate;
