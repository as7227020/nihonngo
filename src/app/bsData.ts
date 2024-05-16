import { ApiRetrunData } from "./types/type";

export const GetApiRetrunData = {
  status: 400,
  message: "",
  data: null,
};
export const staffData = {
  id: "",
  name: "",
  emailVerified: new Date(),
  email: "",
  image: "",
};

export const GetIsAdmin = (name: string): boolean => {
  if (name == "as7227020" || name == "Zin.") {
    return true;
  }

  return false;
};

export enum VocabularyType {
  N5,
  N4,
  N3,
  N2,
  N1,
  單字,
  狀聲詞,
  LV100,
  LV90,
  LV80,
  LV70,
  LV60,
  LV50,
  LV40,
  LV30,
  LV20,
  LV10,
  LV00,
}
