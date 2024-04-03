import "./productList.css";
import { DeleteOutline, Edit, RemoveRedEye } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
// import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { BASE_URL } from "../../../../utils/config";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { Modal } from "@material-ui/core";

export default function ProductList() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tourData, setTourData] = useState();

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/tours`, {
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
    fetchTours();
  }, [fetchTours]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
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
      fetchTours();
    } catch (err) {
      alert(err.message);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.title}</div>;
      },
    },
    { field: "city", headerName: "City", width: 200 },
    // {
    //   field: "hotel",
    //   headerName: "Hotel",
    //   width: 160,
    // },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   width: 120,
    // },
    // {
    //   field: "distance",
    //   headerName: "Distance",
    //   width: 160,
    // },
    {
      field: "maxGroupSize",
      headerName: "Group Size",
      width: 160,
    },
    {
      field: "Adult_Price",
      headerName: "Adult_Price",
      width: 160,
    },
    {
      field: "Child_Price",
      headerName: "Child_Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <RemoveRedEye
              onClick={() => {
                handleOpen();
                setTourData(params.row);
              }}
            />
            <Link to={"/admin/product/" + params.row._id}>
              {/* <div>
                <button className="productListEdit"></button>
              </div> */}
              <Edit />
            </Link>
            <DeleteOutline
              className="productListDelete"
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
      <h1 className="userTitle">Tour List</h1>
      <div className="productList">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 810,
            backgroundColor: "white",
            color: "white",
            border: "2px solid grey",
            boxShadow: "24px",
            padding: "4px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={tourData?.photo}
              alt="tour-img"
              height={300}
              // width={"100%"}
            />
          </div>
          <div className="tour__info">
            <h2>{tourData?.title}</h2>
            <div className="tour__extra-details">
              <span>
                <i class="ri-map-pin-2-line"></i> {tourData?.city}
              </span>
              <span>
                <i class="ri-money-dollar-circle-line"></i> $
                {tourData?.Adult_Price} /For Adult(12+ years)
              </span>
              <span>
                <i class="ri-money-dollar-circle-line"></i> $
                {tourData?.Child_Price} /For Childern
              </span>

              <span>
                <i class="ri-group-line"></i> {tourData?.maxGroupSize} people
              </span>
            </div>
            <h5>Description</h5>
            <p>{tourData?.desc}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
