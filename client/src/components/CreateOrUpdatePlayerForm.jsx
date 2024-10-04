import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Button } from "./ui/Button";
import { FormRow } from "./ui/FormRow";
import { useNavigate, useParams } from "react-router-dom";

export const CreateOrUpdatePlayerForm = ({ player = {} }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const age = form.age.value;
    const team = form.team.value;
    const position = form.position.value;
    const nationality = form.nationality.value;
    const jerseyNumber = form.jerseyNumber.value;
    const playerPhoto = form.playerPhoto.value;

    if (
      !name ||
      !age ||
      !team ||
      !position ||
      !nationality ||
      !jerseyNumber ||
      !playerPhoto
    ) {
      return toast.error("Please fill in all the fields");
    }

    const newPlayer = {
      name,
      age,
      team,
      position,
      nationality,
      jerseyNumber,
      playerPhoto,
    };

    try {
      setIsLoading(true);

      if (!player?._id) {
        await axios.post(
          "https://crud-app-nine-pi.vercel.app/api/players",
          newPlayer
        );
        toast.success("Player successfully added");
      } else {
        await axios.patch(
          `https://crud-app-nine-pi.vercel.app/api/players/${params.playerId}`,
          newPlayer
        );
        toast.success("Player successfully updated");
      }

      form.reset();
      navigate(`/`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred. Please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h3 className="text-2xl font-bold text-center mb-6 mt-8">
        {player?._id ? `Update Player: ${player.name}` : "Create New Player"}
      </h3>
      <form
        onSubmit={onSubmit}
        className="space-y-5 max-w-2xl mx-auto text-gray-200"
      >
        <FormRow label="Player Photo URL">
          <input
            type="text"
            name="playerPhoto"
            defaultValue={player.playerPhoto}
            disabled={isLoading}
            className="border border-gray-400 dark:border-slate-500 dark:bg-[#322448] bg-white rounded-md px-3 py-2 shadow-sm"
          />
        </FormRow>
        <FormRow label="Player Name">
          <input
            type="text"
            name="name"
            defaultValue={player.name}
            disabled={isLoading}
            className="border border-gray-400 dark:border-slate-500 dark:bg-[#322448] bg-white rounded-md px-3 py-2 shadow-sm"
          />
        </FormRow>
        <FormRow label="Age">
          <input
            type="number"
            name="age"
            defaultValue={player.age}
            disabled={isLoading}
            min={1}
            className="border border-gray-400 dark:border-slate-500 dark:bg-[#322448] bg-white rounded-md px-3 py-2 shadow-sm"
          />
        </FormRow>
        <FormRow label="Team">
          <input
            type="text"
            name="team"
            defaultValue={player.team}
            disabled={isLoading}
            className="border border-gray-400 dark:border-slate-500 dark:bg-[#322448] bg-white rounded-md px-3 py-2 shadow-sm"
          />
        </FormRow>
        <FormRow label="Position">
          <select
            name="position"
            defaultValue={player.position}
            disabled={isLoading}
            className="border border-gray-400 dark:border-slate-500 dark:bg-[#322448] bg-white rounded-md px-3 py-2 shadow-sm"
          >
            <option value="goalkeeper">Goalkeeper</option>
            <option value="defender">Defender</option>
            <option value="midfielder">Midfielder</option>
            <option value="forward">Forward</option>
          </select>
        </FormRow>
        <FormRow label="Nationality">
          <input
            type="text"
            name="nationality"
            defaultValue={player.nationality}
            disabled={isLoading}
            className="border border-gray-400 dark:border-slate-500 dark:bg-[#322448] bg-white rounded-md px-3 py-2 shadow-sm"
          />
        </FormRow>
        <FormRow label="Jersey Number">
          <input
            type="number"
            name="jerseyNumber"
            defaultValue={player.jerseyNumber}
            disabled={isLoading}
            min={1}
            className="border border-gray-400 dark:border-slate-500 dark:bg-[#322448] bg-white rounded-md px-3 py-2 shadow-sm"
          />
        </FormRow>
        <div className="w-full">
          <Button disabled={isLoading}>
            {player?._id ? "Update Player" : "Add Player"}
          </Button>
        </div>
      </form>
    </div>
  );
};

CreateOrUpdatePlayerForm.propTypes = {
  player: PropTypes.object,
};
