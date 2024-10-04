import PropTypes from "prop-types";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

export const PlayerCards = ({ players }) => {
  const navigate = useNavigate();

  const handleDelete = async (playerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${playerId}`);
      toast.success("Player deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete the player");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {players.map((player) => (
        <div key={player._id} className="border p-4 rounded-lg shadow-lg">
          <img
            src={player.playerPhoto}
            alt={player.name}
            className="w-full h-64 object-cover object-center rounded-lg"
          />
          <h3 className="text-2xl font-bold mt-4">{player.name}</h3>
          <p className="text-gray-300 mt-4">
            <span className="font-medium">Position:</span> {player.position}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Team:</span> {player.team}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Age:</span> {player.age}
          </p>
          <p className="text-gray-300 mb-6">
            <span className="font-medium">Nationality:</span>{" "}
            {player.nationality}
          </p>

          {/* Update and Delete buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={() => navigate(`/players/update/${player._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaUserEdit />
              Update
            </Button>

            <Button
              onClick={() => handleDelete(player._id)}
              className="!bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaRegTrashCan />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// PropTypes validation
PlayerCards.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      playerPhoto: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      nationality: PropTypes.string.isRequired,
    })
  ).isRequired,
};
