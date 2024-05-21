"use client";
import React, { useEffect } from "react";

type ModalEmptyProps = {
  modalWindowNumber: number; //如果同個畫面有多個該元件的話 不要一樣的數字就好
  btnName: string;
  theView: any;
};
export default function ModalEmpty({
  btnName,
  theView,
  modalWindowNumber,
}: ModalEmptyProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#ModalEmptyModal_${modalWindowNumber}`}
      >
        {btnName}
      </button>

      <div
        className="modal fade"
        id={`ModalEmptyModal_${modalWindowNumber}`}
        tabIndex={-1}
        aria-labelledby={`ModalEmptyModalLabel${modalWindowNumber}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`ModalEmptyModalLabel${modalWindowNumber}`}
              >
                {" "}
                {btnName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{theView}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
