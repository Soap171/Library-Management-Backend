import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Function to fetch user data
const fetchUserData = async (userId) => {
  const response = await fetch(`/api/profile/${userId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Function to update user data
const updateUserData = async ({ userId, userData }) => {
  const response = await fetch(`/api/profile/update/${userId}`, {
    method: "PUT",
    credentials: "include", // Fixed credentials option
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  return response.json();
};

export const useUserProfile = (userId) => {
  const queryClient = useQueryClient();

  // Fetch user data
  const { data, status, error, isLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserData(userId),
  });

  // Mutation for updating user data
  const {
    mutate,
    isLoading: isUpdating,
    isError,
    isSuccess,
    error: updateError,
  } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", userId]);
    },
  });

  return {
    data,
    status,
    error,
    isLoading,
    updateProfile: mutate,
    isUpdating,
    isError,
    isSuccess,
    updateError,
  };
};
