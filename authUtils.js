export const isTokenPresent = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };