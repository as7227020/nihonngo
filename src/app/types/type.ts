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

type CardDataType = {
  question: string;
  answer: string;
  supperUser: string; //提供者
  note: string; //單字補充
};

export type { ApiRetrunData, User, CardDataType };
