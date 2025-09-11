"use client";

import { Pie, PieChart, Cell, Tooltip } from "recharts";

type ChartDataItem = {
  name: string;
  value: number;
  color: string;
};

type ChartPieDonutProps = {
  chartData: ChartDataItem[];
};

export function ChartPieDonut({ chartData }: ChartPieDonutProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white">
      {/* the main pie chart area */}
      <PieChart width={203} height={203}>
        <Pie
          data={chartData} // all the chart data we pass in
          dataKey="value" // which field decides the slice size
          nameKey="name" // label for each slice
          innerRadius={65} // hollow center (makes it a donut)
          outerRadius={100} // overall size of the donut
          paddingAngle={2} // small gap between slices
          cornerRadius={4} // rounded slice corners
        >
          {/* loop through each data item and set its color */}
          {chartData.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.color} />
          ))}
        </Pie>

        {/* tooltip when hovering over slices */}
        <Tooltip
          formatter={(value: number, _name, props: any) => [
            `${value} questions`,
            props.payload?.name,
          ]}
        />
      </PieChart>

      {/* legend below the chart */}
      <div className="mt-4 flex gap-3 font-medium text-black text-sm flex-col justify-center">
        {chartData.map((d, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {/* little colored square that matches the slice */}
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: d.color }}
            />
            {/* label and number */}
            {d.name} :{" "}
            <span className="font-medium text-black text-sm">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
