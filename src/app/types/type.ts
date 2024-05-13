type ApiRetrunData = {
  status: Number;
  message: String;
  data: any;
};
type User = {
  id: string;
  userName: string;
  email: string;
};

export type { ApiRetrunData, User };
