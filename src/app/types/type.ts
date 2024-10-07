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

type sakeType_areas = {
  copyright: string;
  areas: {
    id: number;
    name: string;
  }[];
};

//口味
type sakeType_brand_flavor_tags = {
  copyright: string;
  flavorTags: {
    brandId: number;
    tagIds: number[];
  }[];
};

//口味
type sakeType_flavor_charts = {
  copyright: string;
  flavorCharts: {
    brandId: number;
    f1: number;
    f2: number;
    f3: number;
    f4: number;
    f5: number;
    f6: number;
  }[];
};

//品牌
type sakeType_brands = {
  copyright: string;
  brands: {
    id: number;
    name: string;
    breweryId: number;
  }[];
};

//啤酒廠
type sakeType_breweries = {
  copyright: string;
  breweries: {
    id: number;
    name: string;
    areaId: number;
  }[];
};

//口味標籤
type sakeType_flavor_tag = {
  copyright: string;
  tags: {
    id: number;
    tag: string;
  }[];
};

type sakeType_rankings = {
  copyright: string;
  yearMonth: string;
  //1~100名的 排行榜
  overall: {
    rank: number;
    score: number;
    brandId: number;
  }[];
  areas: {
    areaId: number;
    ranking: {
      rank: number;
      score: number;
      brandId: number;
    }[];
  }[];
};

type SakeData = {
  name: string;
  brewerie: string;
  area: string;
  flover: string[];
  rankScore: number;
  rankArea: number;
  chartF1: number;
  chartF2: number;
  chartF3: number;
  chartF4: number;
  chartF5: number;
  chartF6: number;
};

export type {
  ApiRetrunData,
  User,
  CardDataType,
  TheFinishUIType,
  CardComponentDataType,
  sakeType_areas,
  sakeType_brand_flavor_tags,
  sakeType_flavor_charts,
  sakeType_brands,
  sakeType_breweries,
  sakeType_flavor_tag,
  sakeType_rankings,
  SakeData,
};
