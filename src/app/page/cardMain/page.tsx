"use client";

import { Speak } from "@/app/components/speaker/speaker";

import { useEffect, useState } from "react";
import "./page.css";
import { CardDataType } from "@/app/types/type";

type CardMainProps = {
  theData: string;
  nextFunction: () => void;
};

export default function CardMain({ theData, nextFunction }: CardMainProps) {
  const [inputTextStatus, SetinputTextStatus] = useState("");
  const [answerState, SetanswerState] = useState(false);

  return <div className="container p-2">26</div>;
}
