import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};
