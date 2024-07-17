import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const register = async (data) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
      return;
    }

    if (response.ok) {
      console.log("response ok");
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return { register, error, isLoading, isSuccess };
};
