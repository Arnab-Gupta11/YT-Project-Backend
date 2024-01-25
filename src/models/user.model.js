const { Schema, default: mongoose } = require("mongoose");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

//encrypt password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

//Decrypt password when user want to check
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    //Payload
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    //Access token
    process.env.ACCESS_TOKEN_SECRET,
    //Token expiry time
    {
      expiresIn: process.env.ACESS_TOKEN_EXPIRY,
    }
  );
};

//Generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    //Payload
    {
      _id: this._id,
    },
    //Access token
    process.env.REFRESH_TOKEN_SECRET,
    //Token expiry time
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
