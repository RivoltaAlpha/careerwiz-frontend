export const fetchCsrfToken = async (): Promise<string> => {
    try {
      const response = await fetch("/csrf-token");
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
      throw error;
    }
  };