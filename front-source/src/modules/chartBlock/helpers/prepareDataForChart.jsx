export const CustomizedAxisXTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#FFFFFF"
        transform="rotate(-15)"
        fontSize="14px"
      >
        {payload.value}
      </text>
    </g>
  );
};
export const CustomizedAxisYTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-5} y={5} textAnchor="end" fill="#FFFFFF">
        {payload.value} $
      </text>
    </g>
  );
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-white p-3 rounded-lg">
        <p className=" text-black">Date: {label}</p>
        <p className=" text-black">
          {payload[0].name} {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export function getMinMaxYAxis(data) {
  const arrayOfValues = data.map((crypto) => {
    return crypto.value;
  });

  const limit = 2; // количество цифр после запятой для чисел, которые по оси oy на графике
  let max = Math.max(...arrayOfValues);
  let min = Math.min(...arrayOfValues);

  // Вес добавлен, чтобы график не прижимался к самому верху его окна
  let weight = (max + min) / 500;
  max += weight;
  min -= weight;
  const fixedMax = Number(max.toFixed(limit));
  const fixedMin = Number(min.toFixed(limit));
  return { max: fixedMax, min: fixedMin };
}
