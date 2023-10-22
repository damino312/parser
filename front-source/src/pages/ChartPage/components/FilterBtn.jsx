import React from "react";

export default function FilterBtn({
  nameOfBtn,
  period,
  cryptoName,
  processData,
  setData,
  range = [],
}) {
  return (
    <button
      className="block mb-1 btn-hover capitalize border rounded-lg px-2"
      onClick={() => {
        setData(null);
        processData(period, cryptoName, ...range);
      }}
    >
      {nameOfBtn}
    </button>
  );
}
