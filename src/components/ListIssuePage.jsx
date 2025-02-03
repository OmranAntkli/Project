/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { fetchIssues, deleteIssue, updateIssue } from "../services/api";
import { useNavigate } from "react-router-dom";

function ListIssuePage() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [layout, setLayout] = useState('Layout1');
  const [editingIssue, setEditingIssue] = useState(null);

  const loadIssues = async () => {
    try {
      const response = await fetchIssues();
      if (response && response.data) {
        setIssues(response.data);
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (issue) => {
    setEditingIssue(issue);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingIssue({ ...editingIssue, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedData = {
        title: editingIssue.title,
        description: editingIssue.description,
        issueStatus: editingIssue.issueStatus,
        imageUrl: editingIssue.imageUrl,
        counter: editingIssue.counter,
      };
      const result = await updateIssue(editingIssue.documentId, updatedData);
      if (result) {
        setIssues((prevIssues) =>
          prevIssues.map((issue) =>
            issue.documentId === editingIssue.documentId ? { ...issue, ...updatedData } : issue
          )
        );
        setEditingIssue(null);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleDelete = async (documentId) => {
    const confirmDelete = window.confirm("Delete?");
    if (confirmDelete) {
      try {
        setIssues((prevIssues) => prevIssues.filter((issue) => issue.documentId !== documentId));
        const result = await deleteIssue(documentId);
      
      } catch (error) {
        console.error(error.message);
        alert(error.message);
        loadIssues();
      }
    }
  };

  const handleIncrementCounter = async (documentId) => {
    const updatedIssue = issues.find((issue) => issue.documentId === documentId);
    if (updatedIssue) {
      const newCounter = updatedIssue.counter + 1;
      await handleUpdateIssue(documentId, { counter: newCounter });
    }
  };

  const handleDecrementCounter = async (documentId) => {
    const updatedIssue = issues.find((issue) => issue.documentId === documentId);
    if (updatedIssue && updatedIssue.counter > 0) {
      const newCounter = updatedIssue.counter - 1;
      await handleUpdateIssue(documentId, { counter: newCounter });
    }
  };

  const handleUpdateIssue = async (documentId, updatedData) => {
    try {
      await updateIssue(documentId, updatedData);
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.documentId === documentId ? { ...issue, ...updatedData } : issue
        )
      );
    } catch (error) {
      console.error( error.message);
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === 'All') return true;
    return issue.issueStatus === filter;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Issues</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex space-x-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-200 p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="InProgress"> InProgress</option>
        </select>

        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="bg-gray-200 p-2 rounded"
        >
          <option value="Layout1">Layout1</option>
          <option value="Layout2">Layout2 </option>
        </select>
      </div>

      {loading ? (
        <p>Loding  ...</p>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${layout === 'Layout2' ? 'lg:grid-cols-4' : ''}`}>
          {filteredIssues.map((issue) => (
            <div key={issue.documentId} className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all ${layout === 'Layout2' ? 'border-2 border-gray-300' : ''}`}>
              <h3 className="text-xl font-semibold">{issue.title}</h3>
              <p className="text-sm text-gray-500">{issue.issueStatus}</p>
              <p className="text-sm text-gray-500">{new Date(issue.createdAt).toLocaleString()}</p>
              {issue.imageUrl && (
                <img
                  src={issue.imageUrl}
                  alt="Issue"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-sm text-gray-600">{issue.username}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>Counter: {issue.counter}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => handleDelete(issue.documentId)}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                 delete
                </button>
                <button
                  onClick={() => handleIncrementCounter(issue.documentId)}
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                >
                 addCounter
                </button>
                <button
                  onClick={() => handleDecrementCounter(issue.documentId)}
                  className="bg-yellow-600 text-white py-1 px-3 rounded hover:bg-yellow-700"
                >
                  ReduceCounter
                </button>
                <button
                  onClick={() => handleEdit(issue)}
                  className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                >
                 update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingIssue && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">update proplem </h3>
            <div>
              <input
                type="text"
                value={editingIssue.title}
                onChange={(e) => setEditingIssue({ ...editingIssue, title: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                placeholder="title"
              />
              <textarea
                value={editingIssue.description}
                onChange={(e) => setEditingIssue({ ...editingIssue, description: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                placeholder="descrapation"
              />
              <select
                value={editingIssue.issueStatus}
                onChange={(e) => setEditingIssue({ ...editingIssue, issueStatus: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="InProgress"> InProgress</option>
              </select>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 mb-4"
              />
              {editingIssue.imageUrl && (
                <img
                  src={editingIssue.imageUrl}
                  alt="Uploaded"
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <div className="flex justify-between">
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                >
                  save
                </button>
                <button
                  onClick={() => setEditingIssue(null)}
                  className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-700"
                >
                  clean
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListIssuePage;