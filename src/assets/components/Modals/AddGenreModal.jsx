import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { API_BASE_URL } from "../../../static/DefaultExports";

function AddGenreModal({ onClose, refreshGenres }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !description) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/genre/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      if (res.ok) {
        console.log("Genre added!");
        refreshGenres(); // call parent's fetch function
        onClose(); // close modal
      } else {
        console.error("Failed to add genre");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50 h-100 w-100 rounded-lg self-center justify-self-center">
      <div
        className="bg-white absolute right-2 top-2 rounded-full hover:cursor-pointer"
        onClick={onClose}
      >
        <IoIosClose size={30} />
      </div>
      <div className="flex flex-col gap-y-10 mt-20 px-5">
        <TextField
          id="outlined-name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-desc"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="border-1 rounded-md p-2 border-blue-500"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "SAVE GENRE"}
        </button>
      </div>
    </div>
  );
}

export default AddGenreModal;
