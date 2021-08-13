const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  requestId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  wrfVariables: [
    {
      type: String,
      required: true,
    },
  ],
  output: {
    type: String,
    required: true,
    max: 10,
  },
  resolution: {
    type: String,
    required: true,
    max: 2,
  },
  simulationDate: {
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
    isReviewed: {
      type: Boolean,
      default: true,
    },
    isProceed: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
  },
  outputLink: {
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

requestSchema.pre("save", (next) => {
  if (!this.submitDate) return (this.submitDate = new Date());
  next();
});

module.exports = mongoose.model("WrfGen", requestSchema, "wrfgen_requests");
