import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNameOfCrypto } from "./api/api";

export default function IndexPage() {
  const [names, setNames] = useState(null);

  useEffect(() => {
    getAllNameOfCrypto().then((data) => {
      setNames(data);
    });
  }, []);

  return (
    <div className="w-full  flex flex-col justify-center items-center">
      <div>
        {names ? (
          names.map((data) => (
            <Link
              className="block btn-hover mb-2 text-3xl "
              key={data._id}
              to={"/currency/" + data._id}
            >
              {data.name}
            </Link>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
}
