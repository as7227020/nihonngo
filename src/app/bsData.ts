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
