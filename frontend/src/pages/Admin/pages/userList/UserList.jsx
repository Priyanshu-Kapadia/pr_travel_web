import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
// import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { BASE_URL } from "../../../../utils/config";
import { Spinner } from "reactstrap";

export default function UserList() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      fetchUser();
    } catch (err) {
      alert(err.message);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <span className="userListImg">
              {params?.row?.username?.charAt(0)?.toUpperCase()}
            </span>
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: () => {
        return <div>Active</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/admin/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link> */}
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="container" style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner />
        </div>
      )}
      <h1 className="userTitle">User List</h1>
      <div className="userList">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}
