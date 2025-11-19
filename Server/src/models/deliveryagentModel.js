const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliveryAgentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Agent name is required"],
      trim: true,
      minlength: [2, "Name must have at least 2 characters"],
      maxlength: [100, "Name too long"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false // hide password by default
    },

    vehicleType: {
      type: String,
      enum: ["bike", "car", "van", "truck"],
      default: "bike"
    },

    vehicleNumber: {
      type: String,
      trim: true,
      match: [/^[A-Z0-9-]{5,15}$/, "Invalid vehicle number format"],
      default: null
    },

    assignedArea: {
      type: String,
      default: null,
      trim: true
    },

    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      default: null
    },

    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      default: null
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ON_DUTY", "OFF_DUTY"],
      default: "ACTIVE"
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    lastActiveAt: {
      type: Date,
      default: null
    },

    profileImage: {
      type: String,
      default: null // store image URL
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Update timestamp before save
deliveryAgentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const DeliveryAgent = mongoose.model("DeliveryAgent", deliveryAgentSchema);
module.exports = DeliveryAgent;
