import { CardVocabularyData, CardVocabularySelfData } from "@prisma/client";
import { CardComponentDataType } from "./types/type";

export function CardVocabularyDataToComponenet(
  translateData: CardVocabularyData
): CardComponentDataType {
  return {
    fromType: "CardVocabularyData",
    question: translateData.question,
    answer: translateData.answer,
    supperUser: translateData.supperUser,
    note: translateData.note,
    translateStr: translateData.translateStr,
  };
}

export function CardVocabularySelfDataToComponenet(
  translateData: CardVocabularySelfData
): CardComponentDataType {
  return {
    fromType: "CardVocabularySelfData",
    question: translateData.question,
    answer: translateData.answer,
    supperUser: "",
    note: translateData.note,
    translateStr: translateData.translateStr,
  };
}
