export interface AuthPayload {
  id: number | string;
  name: null | string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}
