
export const useAuth = () => {
  const token = sessionStorage.getItem("token");
  return { isAuthenticated: !!token};
};