import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async ( email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        // Request relative URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  email, password }),
      });

      if (!response.ok) {
        // If the response status is not in the range 200-299
        // then handle the error.
        const json = await response.json();
        console.log(json);
        setError(json.message);
        setIsLoading(false);
        return;
      }

      // If response status is OK, parse JSON response
      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      
    } catch (error) {
      // Handle network errors or other fetch-related errors
      setError("An error occurred while signing up.");
    } finally {
      // Always set loading state to false, regardless of success or failure
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
