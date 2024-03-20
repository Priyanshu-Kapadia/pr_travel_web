import "./widgetSm.css";
// import { Visibility } from "@material-ui/icons";

export default function WidgetSm({ data }) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {data.map((item, index) => (
          <li key={index} className="widgetSmListItem">
            {/* <img
              src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="widgetSmImg"
            /> */}
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <span className="userListImg">
                {item?.username?.charAt(0)?.toUpperCase()}
              </span>
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{item?.username}</span>
                <span className="widgetSmUserTitle">{item?.email}</span>
              </div>
            </div>
            {/* <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
