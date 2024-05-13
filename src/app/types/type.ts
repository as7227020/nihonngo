type ApiRetrunData = {
  status: Number;
  message: String;
  data: any;
};
type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type { ApiRetrunData, User };
