import { FiUserPlus } from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/EmptyState";
import { PlayerCards } from "../components/PlayerCards";
import { useLoaderData, useNavigate } from "react-router-dom";
import { SectionHeader } from "../components/SectionHeader";

const AllPlayers = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const players = data?.data || [];

  return (
    <div className="container mx-auto px-4 md:px-0 mt-20">
      <SectionHeader
        title="Player Management Software"
        description="Manage and explore detailed profiles of players, including their performance stats, team affiliations, and career history. Keep track of player updates and streamline your management processes with ease."
      />
      <div>
        <Button
          onClick={() => navigate(`/players/create`)}
          className="mb-4 flex items-center gap-2"
        >
          <FiUserPlus />
          Add New Player
        </Button>
      </div>

      {players.length ? <PlayerCards players={players} /> : <EmptyState />}
    </div>
  );
};

export default AllPlayers;
