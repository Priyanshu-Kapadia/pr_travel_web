import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    // hotel: {
    //   type: String,
    //   required: true,
    // },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    Adult_Price: {
      type: Number,
      required: true,
    },
    Child_Price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
