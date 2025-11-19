const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ownerName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [100, "Name cannot exceed 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },

  phone: {
    type: Number,
    required: [true, "phone number is required"],
    validate: {
      validator: function (value) {
        // allows empty or 10-digit numbers
        return !value || /^[0-9]{10}$/.test(value);
      },
      message: "Phone number must be 10 digits",
    },
  },

  dob: {
    type: Date,
  },

  shopName: {
    type: String,
    required: [true, " Shop name is required"],
    trim: true,
    minlength: [5, "Shop name must be at least 2 characters"],
  },

  shopAdress: {
    type: String,
    trim: true,
    maxlength: [200, "Shop address cannot exceed 200 characters"],
  },

  gstNumber: {
    type: String,
    unique: true,
    sparse: true, // allows multiple nulls
    validate: {
      validator: function (value) {
        return (
          !value ||
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
            value
          )
        );
      },
      message: "Invalid GST number format",
    },
  },

  profileImage: {
    type: String,
    default: "default-user.png",
  },

  isVerified: { type: Boolean, default: false },

  profileImage: {
    type: String,
    default: "default-seller.png",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

sellerSchema.pre("save", function (next) {
  if (this.shop_name && this.shop_name.length < 2) {
    throw new Error("Shop name must have at least 2 characters");
  }
  next();
});


// Instance method to compare password
sellerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
