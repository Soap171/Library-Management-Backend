import { useQuery } from "@tanstack/react-query";

export const useUserData = (id) => {
  return useQuery({
    queryKey: ["userData", id], // Updated queryKey to include id for unique identification
    queryFn: async () => {
      const response = await fetch(`/api/profile/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};
