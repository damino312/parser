import React from "react";
import FilterBtn from "./FilterBtn";
import SetRange from "./SetRange";

export default function FilterBlock({ name, setData, processData }) {
  const liStyle = "border-b mb-3 pb-3";
  return (
    <ul className=" w-32">
      <li className={liStyle}>
        <FilterBtn
          nameOfBtn={"day"}
          period={"day"}
          cryptoName={name}
          processData={processData}
          setData={setData}
        />
      </li>
      <li className={liStyle}>
        <FilterBtn
          nameOfBtn={"week"}
          period={"week"}
          cryptoName={name}
          processData={processData}
          setData={setData}
        />
      </li>
      <li className={liStyle}>
        <FilterBtn
          nameOfBtn={"month"}
          period={"month"}
          cryptoName={name}
          processData={processData}
          setData={setData}
        />
      </li>
      <li>
        <SetRange
          cryptoName={name}
          processData={processData}
          setData={setData}
        />
      </li>
    </ul>
  );
}
