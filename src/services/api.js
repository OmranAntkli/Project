export const signUpUser = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "Sign up failed");

    return data;
  } catch (err) {
    throw new Error(err.message || "An unexpected error occurred during sign-up");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "Login failed");

    localStorage.setItem("token", data.jwt);
    return data;
  } catch (err) {
    throw new Error(err.message || "An unexpected error occurred during login");
  }
};

export const addIssue = async (issueData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    const { ...filteredData } = issueData;

    const response = await fetch("http://localhost:1337/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ data: filteredData }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "Failed to add issue");

    return data;
  } catch (err) {
    console.error("API Error:", err.message);
    throw new Error(err.message || "An unexpected error occurred while adding the issue");
  }
};

export const fetchIssues = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    const response = await fetch("http://localhost:1337/api/issues", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "Failed to fetch issues");

    return data;
  } catch (err) {
    throw new Error(err.message || "An unexpected error occurred while fetching issues");
  }
};

export const deleteIssue = async (documentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    const response = await fetch(`http://localhost:1337/api/issues/${documentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.error?.message || "Failed to delete issue");
    }

    return true;
  } catch (err) {
    console.error("Error during deletion:", err.message);
    throw new Error(err.message || "An unexpected error occurred while deleting the issue");
  }
};

export const updateIssue = async (documentId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");

    const response = await fetch(`http://localhost:1337/api/issues/${documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ data: updatedData }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "Failed to update issue");

    return data;
  } catch (err) {
    throw new Error(err.message || "An unexpected error occurred while updating the issue");
  }
};
