import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../../../../utils/config";

export default function AdminHome() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/users`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.status === 200) {
        console.log("successfull");
        setData(result.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [token]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchBooking = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.status === 200) {
        console.log("successfull");
        setBookingData(result.data);
        let ChartData = [];
        for (let i = 0; i < result.data.length; i++) {
          console.log(result.data[i]);
          let item = {
            name: result.data[i].fullName,
            price: result.data[i].price ? result.data[i].price : 0,
          };
          ChartData.push(item);
        }
        console.log(ChartData);
        setChartData(ChartData);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [token]);
  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);
  return (
    <div className="admin-container">
      <div className="home">
        {/* <FeaturedInfo /> */}
        <Chart
          data={chartData}
          title="Booking Analytics"
          grid
          dataKey="price"
        />
        <div className="homeWidgets">
          <WidgetSm data={data} />
          <WidgetLg bookingData={bookingData} />
        </div>
      </div>
    </div>
  );
}
