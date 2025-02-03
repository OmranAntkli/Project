/* eslint-disable no-unused-vars */
import { useState } from "react";
import { addIssue } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddIssuePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const handleAddIssue = async (e) => {
    e.preventDefault();
    const newIssue = {
      title: title.trim(),
      description: description.trim(),
      userId: userId.trim(),
      imageUrl: imageUrl.trim() || null,
      counter: 0,
      issueStatus: "Open",
      username: username.trim(),
    };

    try {
      const response = await addIssue(newIssue);
      navigate("/issues");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Proplem</h2>
      <form onSubmit={handleAddIssue} className="bg-white p-4 rounded shadow-md mb-6">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder=" Descrapation"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <input
          type="text"
          placeholder="URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="id "
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="User Name "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        add
        </button>
      </form>
    </div>
  );
}

export default AddIssuePage;
