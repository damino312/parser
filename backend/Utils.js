const countAverage = (data, range) => {
  return new Promise((resolve, reject) => {
    const hourlyAverage = {};

    const day = 1000 * 60 * 60 * 24;
    const start = new Date(range.start).getTime();
    const end = new Date(range.end).getTime();
    const step = end - start < day ? "hour" : "day";

    // Разбиваем наш промежуток по часам и пихаем значение крипты в соответствующий час
    data.forEach((entry) => {
      const value = entry.price;
      let created_at = entry.createdAt;
      if (step === "hour") {
        created_at.setHours(created_at.getHours(), 0, 0, 0);
      } else if (step === "day") {
        created_at.setHours(0, 0, 0, 0);
      }

      created_at = created_at.toUTCString();

      if (!hourlyAverage[created_at]) {
        hourlyAverage[created_at] = [];
      }
      hourlyAverage[created_at].push(value);
    });

    // Вычисляем средние значения для каждого часа
    for (const hour in hourlyAverage) {
      const values = hourlyAverage[hour];
      if (values.length > 0) {
        const averageValue = values.reduce((a, b) => a + b, 0) / values.length;
        hourlyAverage[hour] = averageValue;
      } else {
        hourlyAverage[hour] = null;
      }
    }
    resolve(hourlyAverage);
  });
};

module.exports = { countAverage };
