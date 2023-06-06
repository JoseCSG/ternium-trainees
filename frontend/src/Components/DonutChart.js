import React, { useState,useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function DonutChart() {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 50, 60, 70],
      color: '#F44336'
    },
    {
        name: "series-2",
        data: [15, 20, 25, 30, 35],
      },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/empleados');
        console.log("Response", res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container-fluid mt-3 mb-3">
      <Chart
        options={options}
        series={series}
        type="bar"
        width={500}
        height={320}
      />
    </div>
  );
}

export default DonutChart;
