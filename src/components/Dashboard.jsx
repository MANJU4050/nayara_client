import React, { useEffect, useState } from "react";
import Table from "./Table";
import styles from "../assets/css/modules/Dashboard.module.css";
import { getVehicles } from "../api/vehicles";
import { Spinner } from "react-bootstrap";
import { deleteVehicle } from "../api/vehicles";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";

const prepareChartData = (dataArray) => {
  let dateCounts = {};
  const currentDate = new Date();
  for (let i = 0; i < 10; i++) {
    const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    dateCounts[date] = 0;
  }

  dataArray.forEach((item) => {
    const dateOnly = new Date(item.registrationDate)
      .toISOString()
      .split("T")[0];
    if (dateCounts.hasOwnProperty(dateOnly)) {
      dateCounts[dateOnly]++;
    }
  });

  return Object.keys(dateCounts)
    .map((date) => ({ date, count: dateCounts[date] }))
    .reverse();
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Count ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [today, setToday] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  const datase = [
    { registrationDate: "2023-09-22T00:00:00.000Z" },
    { registrationDate: "2023-09-21T00:00:00.000Z" },
    { registrationDate: "2023-09-21T00:00:00.000Z" },

    { registrationDate: "2023-09-21T00:00:00.000Z" },

    { registrationDate: "2023-09-20T00:00:00.000Z" },
    { registrationDate: "2023-09-19T00:00:00.000Z" },
    { registrationDate: "2023-09-18T00:00:00.000Z" },
    { registrationDate: "2023-09-17T00:00:00.000Z" },
    { registrationDate: "2023-09-16T00:00:00.000Z" },
    { registrationDate: "2023-09-16T00:00:00.000Z" },
    { registrationDate: "2023-09-16T00:00:00.000Z" },
    { registrationDate: "2023-09-16T00:00:00.000Z" },

    { registrationDate: "2023-09-15T00:00:00.000Z" },
    { registrationDate: "2023-09-14T00:00:00.000Z" },
    { registrationDate: "2023-09-13T00:00:00.000Z" },
    { registrationDate: "2023-09-22T00:00:00.000Z" },

    { registrationDate: "2023-09-22T00:00:00.000Z" },
    { registrationDate: "2023-09-22T00:00:00.000Z" },
    { registrationDate: "2023-09-22T00:00:00.000Z" },

    { registrationDate: "2023-09-21T00:00:00.000Z" },
    { registrationDate: "2023-09-20T00:00:00.000Z" },
    { registrationDate: "2023-09-20T00:00:00.000Z" },
    { registrationDate: "2023-09-20T00:00:00.000Z" },
    { registrationDate: "2023-09-20T00:00:00.000Z" },
    { registrationDate: "2023-09-20T00:00:00.000Z" },
    { registrationDate: "2023-09-20T00:00:00.000Z" },
    { registrationDate: "2023-09-20T00:00:00.000Z" },

    { registrationDate: "2023-09-20T00:00:00.000Z" },

    { registrationDate: "2023-09-20T00:00:00.000Z" },

    { registrationDate: "2023-09-19T00:00:00.000Z" },
    { registrationDate: "2023-09-18T00:00:00.000Z" },
    { registrationDate: "2023-09-18T00:00:00.000Z" },

    { registrationDate: "2023-09-18T00:00:00.000Z" },

    { registrationDate: "2023-09-18T00:00:00.000Z" },
    { registrationDate: "2023-09-18T00:00:00.000Z" },
    { registrationDate: "2023-09-18T00:00:00.000Z" },

    { registrationDate: "2023-09-17T00:00:00.000Z" },
    { registrationDate: "2023-09-16T00:00:00.000Z" },
    { registrationDate: "2023-09-15T00:00:00.000Z" },
    { registrationDate: "2023-09-14T00:00:00.000Z" },
    { registrationDate: "2023-09-13T00:00:00.000Z" },
    // ... (and so on up to 50 entries)
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#7B1FA2",
    "#D32F2F",
    "#388E3C",
    "#FBC02D",
    "#8C7BFF",
    "#0288D1",
    "#C2185B",
    "#7B1E00",
  ];

  const datas = [
    { name: "Alice", value: 675 },
    { name: "David", value: 387 },
    { name: "Charlie", value: 512 },
    { name: "Eve", value: 234 },
    { name: "Katherine", value: 721 },
    { name: "Ivy", value: 473 },
    { name: "Mia", value: 149 },
    { name: "Frank", value: 820 },
    { name: "Hannah", value: 439 },
    { name: "David", value: 189 },
    { name: "Alice", value: 585 },
    { name: "Jack", value: 279 },
    { name: "Liam", value: 758 },
  ];

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        setIsLoad(true);
        await getVehicles().then((response) => {
          setToday(response.data?.vehiclesRegisteredToday);
          setTotal(response.data?.totalVehiclesRegistered);
          const sortedVehicles = response.data?.vehicles
            .sort(
              (a, b) =>
                new Date(b.registrationDate) - new Date(a.registrationDate)
            )
            .splice(0, 5);
          setVehicles(sortedVehicles);
        });

        setIsLoad(false);
      } catch (error) {
        console.log(error);
      }

      const newChartData = prepareChartData(datase);
      setChartData(newChartData);
    };

    getAllVehicles();
  }, [reFetch]);

  const deleteVehicleWithId = async (id) => {
    try {
      await deleteVehicle(id).then((res) => {
        toast.success("successfully deleted vehicle");
        setReFetch(!reFetch);
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      {isLoad ? (
        <div
          className="d-flex text-warning justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.chartcontainer}>
            <div className={styles.charts}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="date" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="green" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.charts}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={datas}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {datas.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={styles.detailcontainer}>
            <div className={styles.detailscontainer}>
              <div className={styles.detailsvalue}>{today}</div>
              <div className={styles.detailslabel}>Today</div>
            </div>
            <div className={styles.detailscontainer}>
              <div className={styles.detailsvalue}>{total}</div>
              <div className={styles.detailslabel}>Total</div>
            </div>
          </div>
          <Table
            deleteVehicleWithId={deleteVehicleWithId}
            vehicles={vehicles}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
