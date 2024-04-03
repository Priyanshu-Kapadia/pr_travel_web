import { useCallback, useEffect, useState } from "react";
import "./newProduct.css";
import { BASE_URL } from "../../../../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import Upload from "./Upload";
import axios from "axios";
import { Spinner } from "reactstrap";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [tourImage, setTourImage] = useState("");
  const [changePhoto, setChangePhoto] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const tourId = params?.productId;
  const token = localStorage.getItem("token");

  const toggleChangePhoto = (e) => {
    e.preventDefault();
    setChangePhoto(!changePhoto);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.status === 200) {
        console.log("successfull");
        console.log(result);
        setInputs(result.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [token, tourId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("city", inputs.city);
      formData.append("address", inputs.address);
      formData.append("desc", inputs.desc);
      formData.append("hotel", inputs.hotel);
      formData.append("Adult_Price", Number(inputs.Adult_Price));
      formData.append("Child_Price", Number(inputs.Child_Price));
      formData.append("distance", Number(inputs.distance));
      formData.append("maxGroupSize", Number(inputs.maxGroupSize));
      formData.append("featured", inputs.featured === "true" ? true : false);

      if (tourId) {
        if (tourImage) {
          formData.append("photo", tourImage);
        } else {
          formData.append("photo", inputs.photo);
        }
      } else {
        formData.append("photo", tourImage);
      }
      const token = localStorage.getItem("token");
      if (tourId) {
        await axios.put(`${BASE_URL}/tours/${tourId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${BASE_URL}/tours`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setLoading(false);
      navigate("/admin/products");
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="product-body">
      <div className="newProduct" style={{ position: "relative" }}>
        <h1 className="addProductTitle" style={{ fontSize: "16px" }}>
          {tourId ? "Edit Tour" : "Add Tour"}
        </h1>
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
        <form>
          {tourId && inputs.photo ? (
            changePhoto ? (
              <>
                <Upload
                  name="tourImage"
                  label="Image"
                  // setValue={setInputs}
                  tourImage={tourImage}
                  setTourImage={setTourImage}
                  editData={null}
                />
                {!tourImage && (
                  <button
                    className="addProductButton"
                    onClick={(e) => toggleChangePhoto(e)}
                  >
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <>
                <div style={{ height: "200px" }}>
                  <img src={inputs.photo} alt="tour-img" height={200} />
                </div>
                <button
                  className="addProductButton"
                  onClick={(e) => toggleChangePhoto(e)}
                >
                  Change Photo
                </button>
              </>
            )
          ) : (
            <Upload
              name="tourImage"
              label="Image"
              // setValue={setInputs}
              tourImage={tourImage}
              setTourImage={setTourImage}
              editData={null}
            />
          )}
          <div>
            <div className="addProductForm">
              <div className="addProductItem">
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  value={inputs.title}
                  placeholder="Title Name"
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>City</label>
                <input
                  name="city"
                  type="text"
                  value={inputs.city}
                  placeholder="City Name"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="addProductItem">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  value={inputs.address}
                  placeholder="Address"
                  onChange={handleChange}
                />
              </div> */}
              <div className="addProductItem">
                <label>Description</label>
                <input
                  name="desc"
                  type="text"
                  value={inputs.desc}
                  placeholder="Description..."
                  onChange={handleChange}
                />
              </div>
              {/* <div className="addProductItem">
                <label>Hotel</label>
                <input
                  name="hotel"
                  type="text"
                  value={inputs.hotel}
                  placeholder="Hotel"
                  onChange={handleChange}
                />
              </div> */}
              <div className="addProductItem">
                <label>Adult_Price</label>
                <input
                  name="Adult_Price"
                  type="number"
                  placeholder="₹"
                  value={inputs.Adult_Price}
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Children_Price</label>
                <input
                  name="Child_Price"
                  type="number"
                  placeholder="₹"
                  value={inputs.Child_Price}
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Group Size</label>
                <input
                  name="maxGroupSize"
                  type="number"
                  placeholder=""
                  value={inputs.maxGroupSize}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="addProductItem">
                <label>Distance</label>
                <input
                  name="distance"
                  type="number"
                  placeholder=""
                  value={inputs.distance}
                  onChange={handleChange}
                />
              </div> */}
              <div className="addProductItem">
                <label>Featured</label>
                <select name="featured" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <button onClick={handleClick} className="addProductButton">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
