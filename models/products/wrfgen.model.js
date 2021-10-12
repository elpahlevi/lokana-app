import mongoose from "mongoose";
const { Schema, model } = mongoose;

const requestSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "userModel",
  },
  product: {
    type: String,
    required: true,
  },
  variables: [
    {
      type: String,
      required: true,
    },
  ],
  format: {
    type: String,
    required: true,
    max: 10,
  },
  resolution: {
    type: String,
    required: true,
    max: 2,
  },
  simDate: {
    startDate: {
      type: Date,
      required: true,
    },
    startHours: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    endHours: {
      type: String,
      required: true,
    },
  },
  purpose: {
    type: String,
    required: true,
    max: 140,
  },
  domain: {
    maxLat: {
      type: String,
      required: true,
    },
    maxLon: {
      type: String,
      required: true,
    },
    minLat: {
      type: String,
      required: true,
    },
    minLon: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    default: "created",
  },
  link: {
    type: String,
    default: "",
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  submitDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  finishedDate: {
    type: String,
    default: "",
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Prevent submitDate record overwrite when the data is changed
requestSchema.pre("save", function (next) {
  if (!this.submitDate) {
    return (this.submitDate = new Date());
  }
  next();
});

const wrfgenModel = model("wrfgenModel", requestSchema, "wrfgen_requests");

export default wrfgenModel;
