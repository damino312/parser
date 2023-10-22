import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CustomizedAxisXTick,
  CustomizedAxisYTick,
  getMinMaxYAxis,
  CustomTooltip,
} from "../helpers/prepareDataForChart";

// Каждый график принимает chartData для его отображения.
// Эти данные возвращает getProcessedDataForChart().
export default function Chart({ chartData, width = "100%", height = 300 }) {
  const [range, setRange] = useState({});

  useEffect(() => {
    if (Object.keys(chartData || 0).length !== 0)
      setRange(getMinMaxYAxis(chartData));
  }, [chartData]);
  return (
    <>
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 50,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomizedAxisXTick />} />
          <YAxis
            domain={[range.min, range.max]}
            tick={<CustomizedAxisYTick />}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            name="Price, $"
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
