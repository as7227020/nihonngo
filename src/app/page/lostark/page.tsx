"use client";

import SakeCard from "@/app/components/sake/sakeCard";
import LoadingView from "@/app/components/UI/loadingView";
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
  const [SakeData_Show, SetSakeData_Show] = useState<SakeData[]>();
  const [loadingViewController, SetloadingViewController] = useState(false);

  //頁數的陣列資料 用來顯示頁數 map用
  const [pageData, SetpageData] = useState<number[]>([1]);
  //目前頁數
  const [currPage, SetcurrPage] = useState(1);
  //目前最大頁數
  const [maxPageCount, SetmaxPageCount] = useState(0);
  const ONE_PAGE_SHOW_COUNT = 10;

  const [searchWord, SetsearchWord] = useState("");

  useEffect(() => {
    Setareas_Data(areas);
    Setbrand_flavor_tags_Data(brand_flavor_tags);
    Setbrands_Data(brands);
    Setabreweries_Data(breweries);
    Setflavor_tag_Data(flavor_tags);
    Setflavor_charts_Data(flavor_charts);
    Setrankings_Data(rankings);
    SetcurrPage(1);
  }, []);

  const SetFlavor = async (index: number) => {
    const flavorId = flavor_tag_Data?.tags[Number(index)].id;
    const flavorTotalData = brand_flavor_tags_Data?.flavorTags.filter(
      (x) => x.tagIds.length >= 1 && x.tagIds.find((x) => x == flavorId) != null
    );

    let sakeDatas: SakeData[] = [];

    flavorTotalData!.forEach((data) => {
      const brandData = brands_Data?.brands.filter((x) => x.id == data.brandId);
      if (brandData != null && brandData.length >= 1) {
        brandData.forEach((brand) => {
          const d = GetSakeData(brand.id!);
          sakeDatas.push(d);
        });
      }
    });

    SetSakeData(sakeDatas);
    SetPage(sakeDatas);
  };

  const SetPage = (sakeDatas: SakeData[]) => {
    var i: number;
    let sakeDatas_Show: SakeData[] = [];
    for (
      i = 0 + (currPage - 1) * ONE_PAGE_SHOW_COUNT;
      i < currPage * ONE_PAGE_SHOW_COUNT;
      i++
    ) {
      // 1開始 ~ ...totalPageCount
      sakeDatas_Show.push(sakeDatas[i]);
    }

    ChangePage(1, sakeDatas, true);

    SetSakeData_Show(sakeDatas_Show);
  };

  //往 top: 340位置移動
  const scrollUp = () => {
    window.scrollTo({
      top: 280,
      behavior: "smooth",
    });
  };

  //切換頁數
  const ChangePage = (
    page: number,
    newSakeData: SakeData[],
    forceUpdate: boolean
  ) => {
    if (forceUpdate == false && currPage == page) {
      //console.log("不更新");
      return;
    }

    const mySakeData: SakeData[] =
      newSakeData == null ? SakeData! : newSakeData;
    //畫面位置移到該位置
    //scrollUp();

    //讀取顯示開啟
    SetloadingViewController(true);

    var i: number;
    let sakeDatas_Show: SakeData[] = [];
    for (
      i = 0 + (page - 1) * ONE_PAGE_SHOW_COUNT;
      i < page * ONE_PAGE_SHOW_COUNT;
      i++
    ) {
      // 1開始 ~ ...totalPageCount
      if (mySakeData![i] != null) {
        sakeDatas_Show.push(mySakeData![i]);
      }
    }
    SetSakeData_Show(sakeDatas_Show);

    SetcurrPage(page);

    const totalPageCount = Math.ceil(mySakeData!.length / ONE_PAGE_SHOW_COUNT);
    let thePageData: number[] = [];
    var i: number;

    const overPagetoMid = 4; //到第4頁以上至中
    if (page >= overPagetoMid && page != totalPageCount) {
      //4頁以上並且不等於最後一頁 主要顯示4,5,6,7,8頁數 ,其他狀況下面else處理
      for (
        i = totalPageCount - (page - 3) <= 4 ? page - 4 : page - 3;
        i < page + 2;
        i++
      ) {
        if (i < totalPageCount) {
          thePageData.push(i + 1);
        }
      }
    } else {
      //處理其他狀況
      if (page != totalPageCount) {
        //最開始的1~最後一頁 小於5就僅顯示小於5的頁數為止
        for (i = 0; i < 5; i++) {
          // 1開始 ~ ...totalPageCount
          if (i < totalPageCount) {
            thePageData.push(i + 1);
          }
        }
      } else {
        //切到最後一頁 總共15頁 顯示11,12,13,14,15
        for (
          i = totalPageCount - 5 <= 0 ? 0 : Math.abs(totalPageCount - 5);
          i < totalPageCount;
          i++
        ) {
          // 1開始 ~ ...totalPageCount
          thePageData.push(i + 1);
        }
      }
    }
    //存進頁數顯示資料
    SetpageData(thePageData);
    SetmaxPageCount(totalPageCount);
    //送出語法 使用紀錄的
    //SendReq(sqlRecordStr, page, false);
    SetloadingViewController(false);
  };

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
      さけのわ　 －　目前資料{SakeData?.length}筆
      <LoadingView viewSwitch={loadingViewController} />
      <div className="input-group mb-3">
        <span className="input-group-text" style={{ width: "auto" }}>
          酒名搜尋
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={searchWord}
          onChange={(e) => {
            SetsearchWord(e.target.value);
            let sakeDatas: SakeData[] = [];
            if (e.target.value.length >= 1) {
              const nowSearchData = brands_Data?.brands.filter((x) =>
                x.name.includes(e.target.value)
              );

              nowSearchData!.forEach((brand) => {
                const d = GetSakeData(brand.id!);
                sakeDatas.push(d);
              });
            }

            SetPage(sakeDatas!);
            SetSakeData(sakeDatas);
          }}
        />
      </div>
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
        onChange={async (e) => {
          SetloadingViewController(true);
          SetbrandSelectIndex(Number(e.target.value));
          SetSakeData([]);
          const brandId = brands_Data?.brands[Number(e.target.value)].id;
          let sakeDatas: SakeData[] = [];
          sakeDatas.push(GetSakeData(brandId!));
          SetSakeData(sakeDatas);
          SetPage(sakeDatas);
          SetloadingViewController(false);
        }}
      >
        <option value="">酒名 共{brands_Data?.brands.length}筆</option>

        {brands_Data?.brands.map((data, index) => (
          <option key={index} value={index}>
            {data.name}
          </option>
        ))}
      </select>
      <br />
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
        onChange={async (e) => {
          SetloadingViewController(true);

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
          //console.log(sakeDatas);
          SetSakeData(sakeDatas);
          SetPage(sakeDatas);
          SetloadingViewController(false);
        }}
      >
        <option value="">地區</option>

        {areas_Data?.areas.map((data, index) => (
          <option key={index} value={index}>
            {data.name}
          </option>
        ))}
      </select>
      <br />
      <select
        className="form-select"
        aria-label="Default select example"
        id="role"
        onChange={(e) => {
          SetloadingViewController(true);
          SetFlavor(Number(e.target.value)).then(() => {
            SetloadingViewController(false);
          });
        }}
      >
        <option value="">口味</option>

        {flavor_tag_Data?.tags.map((data, index) => (
          <option key={index} value={index}>
            {data.tag}
          </option>
        ))}
      </select>
      <br />
      {SakeData_Show != null && SakeData_Show!.length >= 1
        ? SakeData_Show?.map((data, index) => (
            <SakeCard
              key={index}
              msg={(
                (currPage - 1) * ONE_PAGE_SHOW_COUNT +
                index +
                1
              ).toString()}
              Sake_Data={data}
            />
          ))
        : ""}
      {maxPageCount > 1 ? (
        <div className="row">
          <div
            className="col-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <nav
              aria-label="Page navigation "
              style={{
                position: "fixed",
                zIndex: "15",
                bottom: "-10px",
                right: "30%",
                opacity: "85%",
              }}
            >
              <ul className="pagination pagination-sm">
                <li className="page-item">
                  <a
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => {
                      ChangePage(1, SakeData!, false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {pageData.map((num) => (
                  <li
                    key={num}
                    className={
                      currPage == num ? "page-item active" : "page-item"
                    }
                  >
                    <a
                      className="page-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        ChangePage(num, SakeData!, false);
                      }}
                    >
                      {num}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      ChangePage(maxPageCount, SakeData!, false);
                    }}
                    aria-label="Next"
                    style={{ cursor: "pointer" }}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
