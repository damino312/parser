import React, { useState } from "react";
import FilterBtn from "./FilterBtn";

export default function SetRange({ cryptoName, processData, setData }) {
  const [dateChangeFrom, setDateChangeFrom] = useState(null);
  const [dateChangeTo, setDateChangeTo] = useState(null);

  function handleDateChangeFrom(ev) {
    const { value } = ev.target;
    setDateChangeFrom(value);
  }
  function handleDateChangeTo(ev) {
    const { value } = ev.target;
    setDateChangeTo(value);
  }
  return (
    <div>
      <span className="font-bold">From: </span>
      <input
        type="datetime-local"
        className="  text-black mb-3 w-36 rounded-lg px-1"
        onChange={(ev) => handleDateChangeFrom(ev)}
      />
      <span className="font-bold">To: </span>
      <input
        type="datetime-local"
        className="text-black mb-3 w-36 rounded-lg px-1"
        onChange={(ev) => handleDateChangeTo(ev)}
      />
      <FilterBtn
        nameOfBtn={"Range"}
        period={"range"}
        cryptoName={cryptoName}
        setData={setData}
        processData={processData}
        range={[dateChangeFrom, dateChangeTo]}
      />
    </div>
  );
}
