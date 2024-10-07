"use client";

import SakeCard from "@/app/components/sake/sakeCard";
import { brand_flavor_tags } from "@/app/SaKe_brand_flavor_tags";
import { brands } from "@/app/SaKe_brands";
import { breweries } from "@/app/SaKe_breweries";
import { flavor_charts } from "@/app/SaKe_flavor_charts";
import { areas, flavor_tags } from "@/app/SaKe_flavor_tag_And_areas";
import { rankings } from "@/app/SaKe_rankings";
import {
  SakeData,
  sakeType_areas,
  sakeType_brand_flavor_tags,
  sakeType_brands,
  sakeType_breweries,
  sakeType_flavor_charts,
  sakeType_flavor_tag,
  sakeType_rankings,
} from "@/app/types/type";

import React, { useEffect, useState } from "react";

// type ItemProperty = {
//   ItemType: string;
//   FirstOptionText: string;
//   FirstOptionValue: string;
//   SecondOptionText: string;
// };

export default function LobbyPage() {
  const [areas_Data, Setareas_Data] = useState<sakeType_areas>();
  const [brand_flavor_tags_Data, Setbrand_flavor_tags_Data] =
    useState<sakeType_brand_flavor_tags>();
  const [brands_Data, Setbrands_Data] = useState<sakeType_brands>();
  const [breweries_Data, Setabreweries_Data] = useState<sakeType_breweries>();
  const [flavor_tag_Data, Setflavor_tag_Data] = useState<sakeType_flavor_tag>();
  const [flavor_charts_Data, Setflavor_charts_Data] =
    useState<sakeType_flavor_charts>();
  const [rankings_Data, Setrankings_Data] = useState<sakeType_rankings>();

  const [brandSelectIndex, SetbrandSelectIndex] = useState(-1);

  const [SakeData, SetSakeData] = useState<SakeData[]>();

  useEffect(() => {
    Setareas_Data(areas);
    Setbrand_flavor_tags_Data(brand_flavor_tags);
    Setbrands_Data(brands);
    Setabreweries_Data(breweries);
    Setflavor_tag_Data(flavor_tags);
    Setflavor_charts_Data(flavor_charts);
    Setrankings_Data(rankings);
  }, []);

  const GetSakeData = (brandId: number): SakeData => {
    const brands = brands_Data?.brands.filter((x) => x.id == brandId);

    const breweries = breweries_Data?.breweries.filter(
      (x) => x.id == brands![0].breweryId
    );

    const area = areas_Data?.areas.filter((x) => x.id == breweries![0].areaId);

    const brand_flavor_tags = brand_flavor_tags_Data?.flavorTags.filter(
      (x) => x.brandId == brandId //brands[0].id
    );

    let returnStr: string[] = [];
    if (brand_flavor_tags!.length >= 1) {
      brand_flavor_tags![0].tagIds.forEach((id) => {
        const favor = flavor_tag_Data?.tags.filter((x) => x.id == id);
        if (favor !== null && favor!.length >= 1) {
          returnStr.push(favor![0].tag);
        }
      });
    }

    const rank_area = rankings_Data?.areas.filter(
      (x) => x.areaId == area![0].id
    );

    const rankData = rank_area![0].ranking.filter((x) => x.brandId == brandId);

    const flavor_charts = flavor_charts_Data?.flavorCharts.filter(
      (x) => x.brandId == brandId
    );

    return {
      name: brands![0].name,
      brewerie: breweries![0].name,
      area: area![0].name,
      flover: returnStr,
      rankScore: rankData!.length <= 0 ? 0 : rankData![0].score,
      rankArea: rankData!.length <= 0 ? 0 : rankData![0].rank,
      chartF1: flavor_charts!.length <= 0 ? 0 : flavor_charts![0].f1,
      chartF2: flavor_charts!.length <= 0 ? 0 : flavor_charts![0].f2,
      chartF3: flavor_charts!.length <= 0 ? 0 : flavor_charts![0].f3,
      chartF4: flavor_charts!.length <= 0 ? 0 : flavor_charts![0].f4,
      chartF5: flavor_charts!.length <= 0 ? 0 : flavor_charts![0].f5,
      chartF6: flavor_charts!.length <= 0 ? 0 : flavor_charts![0].f6,
    };
  };

  return (
    <div>
      さけのわ
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
        onChange={(e) => {
          SetbrandSelectIndex(Number(e.target.value));
          SetSakeData([]);
          const brandId = brands_Data?.brands[Number(e.target.value)].id;
          let sakeDatas: SakeData[] = [];
          sakeDatas.push(GetSakeData(brandId!));
          SetSakeData(sakeDatas);
        }}
      >
        <option value="">酒名 共{brands_Data?.brands.length}筆</option>

        {brands_Data?.brands.map((data, index) => (
          <option key={index} value={index}>
            {data.id} - {data.name}
          </option>
        ))}
      </select>
      <br />
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
        onChange={(e) => {
          const areaId = areas_Data?.areas[Number(e.target.value)].id;
          const breweriesTotalData = breweries_Data?.breweries.filter(
            (x) => x.areaId == areaId
          );

          let sakeDatas: SakeData[] = [];

          breweriesTotalData!.forEach((brewerie) => {
            const brandData = brands_Data?.brands.filter(
              (x) => x.breweryId == brewerie.id
            );
            if (brandData != null && brandData.length >= 1) {
              brandData.forEach((brand) => {
                const d = GetSakeData(brand.id!);
                sakeDatas.push(d);
              });
            }
          });

          SetSakeData(sakeDatas);
        }}
      >
        <option value="">地區</option>

        {areas_Data?.areas.map((data, index) => (
          <option key={index} value={index}>
            {data.id} - {data.name}
          </option>
        ))}
      </select>
      <br />
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
        onChange={(e) => {
          const flavorId = flavor_tag_Data?.tags[Number(e.target.value)].id;
          const flavorTotalData = brand_flavor_tags_Data?.flavorTags.filter(
            (x) =>
              x.tagIds.length >= 1 &&
              x.tagIds.find((x) => x == flavorId) != null
          );

          let sakeDatas: SakeData[] = [];

          console.log(flavorTotalData);
          flavorTotalData!.forEach((data) => {
            const brandData = brands_Data?.brands.filter(
              (x) => x.id == data.brandId
            );
            if (brandData != null && brandData.length >= 1) {
              brandData.forEach((brand) => {
                const d = GetSakeData(brand.id!);
                sakeDatas.push(d);
              });
            }
          });

          SetSakeData(sakeDatas);
        }}
      >
        <option value="">口味</option>

        {flavor_tag_Data?.tags.map((data, index) => (
          <option key={index} value={index}>
            {data.id} : {data.tag}
          </option>
        ))}
      </select>
      <br />
      {SakeData != null && SakeData!.length >= 1
        ? SakeData?.map((data, index) => (
            <SakeCard key={index} Sake_Data={data} />
          ))
        : ""}
    </div>
  );
}
