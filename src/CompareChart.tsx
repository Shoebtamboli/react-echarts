import React from "react";

import ReactECharts from "echarts-for-react";
import { dataset } from "./data";
import { Grid } from "@mui/material";

const currentYear = new Date().getFullYear();

const generateYearsBetween = (startYear: any, endYear?: any) => {
  const endDate = endYear || currentYear;
  let years = [];

  for (var i = startYear; i <= endDate; i++) {
    years.push(startYear);
    startYear++;
  }

  return years;
};

const getLastMonths = () => {
  var monthName: string[] = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  );
  var d = new Date();
  var lastMonths = [];
  d.setDate(1);
  for (var i = 0; i <= 11; i++) {
    lastMonths.push(monthName[d.getMonth()]); // + " " + d.getFullYear()
    d.setMonth(d.getMonth() - 1);
  }
  //console.log("last months:", lastMonths);
  return lastMonths;
};

const ordersForYear = (year: any) => {
  const data = dataset
    .filter((obj) => obj.year === year)
    .sort((a, b) => {
      return (
        getLastMonths().indexOf(a.month.substr(0, 3)) -
        getLastMonths().indexOf(b.month.substr(0, 3))
      );
    })
    .reverse();

  // Read the index for december month
  const getIndexOfDec = data.findIndex((object) => {
    return object.month === "Dec";
  });

  // If year is 2 years before then split data
  if (year === currentYear - 2) {
    data.length = getIndexOfDec + 1;
    return data;
  }

  return data;
};

// if (year === currentYear - 2) {
//   // Read the index for december month
//   const getIndexOfDec = data.findIndex((object: any) => {
//     return object.month === 12;
//   });
//   data.length = getIndexOfDec + 1;

//   return data.map((obj: any) => obj.volume);
// }
// if (year === currentYear - 1) {
//   return data.map((obj: any) => obj.volume);
// }

// if (year === currentYear) {
//   const volumes = new Array(data.length - 2).fill(0);
//   const volumeData = data.map((obj: any) => obj.volume);

//   return volumes.concat(volumeData);
// }

const CompareChart = () => {
  const option = {
    title: {
      text: "COMPARISION OF ORDERS"
    },
    // tooltip: {
    //   trigger: "axis"
    // },
    legend: {
      data: generateYearsBetween(currentYear - 2).map(String),
      bottom: "bottom",
      selectedMode: false
    },
    toolbox: {
      show: true,
      feature: {
        //dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["bar"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        data: getLastMonths().reverse()
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "Number of Orders",
        nameLocation: "end"
      }
    ],
    series: [
      // {
      //   name: currentYear - 2,
      //   type: "bar",
      //   data: ordersForYear(currentYear - 2, dataset),
      // },
      // {
      //   name: currentYear - 1,
      //   type: "bar",
      //   data: ordersForYear(currentYear - 1, dataset),
      // },
      // {
      //   name: currentYear,
      //   type: "bar",
      //   data: ordersForYear(currentYear, dataset),
      // },

      {
        name: currentYear - 2,
        type: "bar",
        data: ordersForYear(currentYear - 2).map((obj) => obj.orders)
      },
      {
        name: currentYear - 1,
        type: "bar",
        data: ordersForYear(currentYear - 1).map((obj) => obj.orders)
      },
      {
        name: currentYear,
        type: "bar",
        data: ordersForYear(currentYear).map((obj) => obj.orders)
      }
    ]
  };

  return (
    <Grid item>
      <ReactECharts option={option} />
    </Grid>
  );
};

export default CompareChart;
