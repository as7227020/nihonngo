export const DoTranslate = async (vocabulary: string): Promise<any> => {
  //console.log("DoTranslate");
  // const userDatas = await fetch(
  //   `https://script.google.com/macros/s/AKfycbxtv4reCIfvcTmbneZKelo5U2zYEaIWGtsOnbBqY2nzfvFWxCW1ZXCvc_Jqe4L3oxd8zQ/exec`,
  //   {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       postData: {
  //         from: "jp",
  //         to: "zh-TW",
  //         data: [
  //           "ロシアのプーチン大統領が中国国賓訪問を控えた１５日",
  //           "学校の先生と若い女性が付き合っている",
  //         ],
  //       },
  //     }),
  //   }
  // );
  const userDatas = await fetch(
    `https://script.google.com/macros/s/AKfycbwoTxZYjEfyJA7ve4j7Rr3UcsuoAFc-SlHeKY53Bs63Rwp2yBOw_UE62Fuj_3NIY0roMg/exec?text=${vocabulary}&source=ja&target=zh-TW`
  );
  const resUserData = await userDatas.json();
  return resUserData;
};

export const Gethiragara = async (vocabulary: string): Promise<any> => {
  console.log("Gethiragara:" + vocabulary);
  const userDatas = await fetch(`https://labs.goo.ne.jp/api/hiragana`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id:
        "00558ac16f4c513d2d28ca2cd783001c5bc612d3bb5d01c73cc41e319de3f812",
      request_id: "record003",
      sentence: vocabulary,
      output_type: "hiragana",
    }),
  });

  const resUserData = await userDatas.json();
  return resUserData;
};
