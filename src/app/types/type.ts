import { CardVocabularySelfData, UserLearnData } from "@prisma/client";

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
  emailVerified: Date;
  isManager: boolean;
  UserLearnData?: UserLearnData;
  CardVocabularySelfData: CardVocabularySelfData[];
};
type CardComponentDataType = {
  fromType: string;
  question: string;
  answer: string;
  supperUser: string; //提供者
  note: string; //單字補充
  translateStr: string;
};
type CardDataType = {
  question: string;
  answer: string;
  supperUser: string; //提供者
  note: string; //單字補充
};
type TheFinishUIType = {
  question: string;
  answer: string;
  isGetTip: boolean;
  cardIndex: string;
};
export type {
  ApiRetrunData,
  User,
  CardDataType,
  TheFinishUIType,
  CardComponentDataType,
};
