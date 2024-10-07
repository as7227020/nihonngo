"use client";

import { brands } from "@/app/SaKe_brands";
import { breweries } from "@/app/SaKe_breweries";
import { flavor_charts } from "@/app/SaKe_flavor_charts";
import { areas, flavor_tags } from "@/app/SaKe_flavor_tag_And_areas";
import { rankings } from "@/app/SaKe_rankings";
import {
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

  useEffect(() => {
    Setareas_Data(areas);
    Setbrand_flavor_tags_Data(brand_flavor_tags_Data);
    Setbrands_Data(brands);
    Setabreweries_Data(breweries);
    Setflavor_tag_Data(flavor_tags);
    Setflavor_charts_Data(flavor_charts);
    Setrankings_Data(rankings);
  }, []);

  return (
    <div>
      さけのわ
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
      >
        <option value="">地區</option>

        {areas_Data?.areas.map((data, index) => (
          <option key={index} value={index}>
            {data.id} : {data.name}
          </option>
        ))}
      </select>
      <br />
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
      >
        <option value="">口味</option>

        {flavor_tag_Data?.tags.map((data, index) => (
          <option key={index} value={index}>
            {data.id} : {data.tag}
          </option>
        ))}
      </select>
    </div>
  );
}
