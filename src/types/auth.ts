export type Admin = {
  id: number;
  username: string;
  token: string;
};

export type AuthContextType = {
  login: (user: Admin) => void;
  logout: () => void;
};
