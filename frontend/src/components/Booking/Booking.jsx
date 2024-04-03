import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { Child_Price, Adult_Price, reviews, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    price: "",
    phone: "",
    Ad_Count: 0,
    Ch_Count: 0,
    bookAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(Adult_Price) * Number(booking.Ad_Count) +
    Number(serviceFee) +
    Number(Child_Price) * Number(booking.Ch_Count);

  //   send data to the server
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      const token = localStorage.getItem("token");
      booking.price = totalAmount;
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${Adult_Price} <span>/For Adult(12+ year)</span>
        </h3>
        <h3>
          ${Child_Price} <span>/For Children</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i class="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ========== booking form ============= */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="number"
              placeholder="Adult"
              id="Ad_Count"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Children"
              id="Ch_Count"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ========== booking end ============= */}

      {/* ========= booking bottom ============ */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${Adult_Price} <i class="ri-close-line"></i> {booking.Ad_Count}{" "}
              Adult
            </h5>
            <span> ${Adult_Price * booking.Ad_Count}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${Child_Price} <i class="ri-close-line"></i> {booking.Ch_Count}{" "}
              Children
            </h5>
            <span> ${Child_Price * booking.Ch_Count}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span> ${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span> ${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
