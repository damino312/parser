import React, { useState, useEffect } from "react";
import { Chart, processDataForChart } from "../../modules/chartBlock/index";
import { getNameOfCryptoById } from "./api/api";
import Loading from "./components/Loading";
import { useLocation } from "react-router";
import FilterBlock from "./components/FilterBlock";
import { Link } from "react-router-dom";

function ChartPage() {
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);

  const { pathname } = useLocation();
  const params = pathname.split("/");
  const idOfCrypto = params[2];

  useEffect(() => {
    getNameOfCryptoById(idOfCrypto).then((name) => {
      processData("month", name);
      setName(name);
    });
  }, []);

  function processData(period, name, ...dataRange) {
    processDataForChart(period, name, ...dataRange).then((data) => {
      setData(data);
    });
  }
  return (
    <div className=" flex flex-col justify-center  w-full">
      <h1 className=" text-center text-3xl mb-6 relative">
        {name}{" "}
        <Link to={"/"} className="absolute left-0 ml-32 btn-hover">
          Back
        </Link>
      </h1>
      <div className="flex">
        <Chart chartData={data} />
        {data === null && <Loading />}
        <div className="w-56">
          <FilterBlock
            name={name}
            setData={setData}
            processData={processData}
          />
        </div>
      </div>
    </div>
  );
}

export default ChartPage;
