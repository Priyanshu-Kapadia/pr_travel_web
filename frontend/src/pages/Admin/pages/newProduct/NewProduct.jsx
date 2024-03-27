import { useState } from "react";
import "./newProduct.css";
import { BASE_URL } from "../../../../utils/config";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import axios from "axios";
import { Spinner } from "reactstrap";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [tourImage, setTourImage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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

      formData.append("photo", tourImage);
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/tours`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      navigate("/admin/products");
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle" style={{ fontSize: "16px" }}>New Product</h1>
      {loading && <Spinner />}
      <form>
        <Upload
          name="tourImage"
          label="Image"
          // setValue={setInputs}
          tourImage={tourImage}
          setTourImage={setTourImage}
          editData={null}
        />
        <div>
          <div className="addProductForm">
            <div className="addProductItem">
              <label>Title</label>
              <input
                name="title"
                type="text"
                placeholder="Title Name"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>City</label>
              <input
                name="city"
                type="text"
                placeholder="City Name"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Address</label>
              <input
                name="address"
                type="text"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                name="desc"
                type="text"
                placeholder="Description..."
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Hotel</label>
              <input
                name="hotel"
                type="text"
                placeholder="Hotel"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Adult_Price</label>
              <input
                name="Adult_Price"
                type="number"
                placeholder="₹"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Children_Price</label>
              <input
                name="Child_Price"
                type="number"
                placeholder="₹"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Group Size</label>
              <input
                name="maxGroupSize"
                type="number"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Distance</label>
              <input
                name="distance"
                type="number"
                placeholder=""
                onChange={handleChange}
              />
            </div>
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
  );
}
