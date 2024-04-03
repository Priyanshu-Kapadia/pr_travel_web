import "./widgetLg.css";
import moment from "moment";

export default function WidgetLg({ bookingData }) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>Booked</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Booking History</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          {/* <th className="widgetLgTh">Email</th> */}
          <th className="widgetLgTh">Tour Name</th>
          <th className="widgetLgTh">Phone</th>
          <th className="widgetLgTh">Adult</th>
          <th className="widgetLgTh">Children</th>
          <th className="widgetLgTh">Booking Date</th>
          <th className="widgetLgTh">Price</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {bookingData.map((item, index) => (
          <tr key={index} className="widgetLgTr">
            <td className="widgetLgName">{item.fullName}</td>
            {/* <td className="widgetLgName">{item.userEmail}</td> */}
            <td className="widgetLgName">{item.tourName}</td>
            <td className="widgetLgAmount">{item.phone}</td>
            <td className="widgetLgAmount">{item.Ad_Count}</td>
            <td className="widgetLgAmount">{item.Ch_Count}</td>

            <td className="widgetLgDate">
              {moment(item.bookAt).utc().format("DD-MM-YYYY")}
            </td>
            <td className="widgetLgAmount">
              {item.price ? `$${item.price}` : "$0"}
            </td>
            <td className="widgetLgStatus">
              <Button type="Approved" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
