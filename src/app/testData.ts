import { CardDataType } from "./types/type";

export const GetCardData = (): CardDataType[] => {
  let empty: CardDataType[] = [];
  empty.push({
    question: "犠牲",
    answer: "ぎせい",
    supperUser: "",
    note: "",
  });
  empty.push({
    question: "虐殺",
    answer: "ぎゃくさつ",
    supperUser: "",
    note: "",
  });
  empty.push({
    question: "蚯蚓",
    answer: "みみず",
    supperUser: "",
    note: "",
  });

  return empty;
};
