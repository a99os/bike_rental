const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Shopinfo = sequelize.define(
  "shopinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    shop_name: { type: DataTypes.STRING, unique: true },
    owner_name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING(100) },
    email_address: { type: DataTypes.STRING(30) },
    contact_no: { type: DataTypes.STRING(15) },
    website: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.INTEGER },
  },
  { freezeTableName: true }
);
const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    usename: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    fullname: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING(15) },
    email: { type: DataTypes.STRING },
    user_category_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.BOOLEAN },
  },
  { freezeTableName: true }
);
const Adsmanagment = sequelize.define(
  "adsmanagment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, unique: true },
    shop_id: { type: DataTypes.INTEGER },
    banner_image: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    ad_location: { type: DataTypes.BOOLEAN },
    amount: { type: DataTypes.DECIMAL(15, 2) },
    user_id: { type: DataTypes.INTEGER },
  },
  { freezeTableName: true }
);

const Usergroup = sequelize.define(
  "usergroup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.STRING },
    allow_add: { type: DataTypes.BOOLEAN },
    allow_edit: { type: DataTypes.BOOLEAN },
    allow_delete: { type: DataTypes.BOOLEAN },
    allow_print: { type: DataTypes.BOOLEAN },
    allow_import: { type: DataTypes.BOOLEAN },
    allow_export: { type: DataTypes.BOOLEAN },
  },
  { freezeTableName: true }
);
const Rental = sequelize.define(
  "rental",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    bike_id: { type: DataTypes.INTEGER },
    client_id: { type: DataTypes.INTEGER },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    total_amount: { type: DataTypes.DECIMAL(15, 2) },
    payment_status: { type: DataTypes.BOOLEAN },
    rental_status: { type: DataTypes.BOOLEAN },
    remarks: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
  },
  { freezeTableName: true }
);
const Bikecategory = sequelize.define(
  "bikecategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category_name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
  },
  { freezeTableName: true }
);
const Bikeinfo = sequelize.define(
  "bikeinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    bike_category_id: { type: DataTypes.INTEGER },
    shop_id: { type: DataTypes.INTEGER },
    bike_name: { type: DataTypes.STRING },
    specs: { type: DataTypes.STRING },
    rent_price: { type: DataTypes.DECIMAL(15, 2) },
    availabilty: { type: DataTypes.BOOLEAN },
    user_id: { type: DataTypes.INTEGER },
  },
  { freezeTableName: true }
);
const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    client_code: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    client_name: { type: DataTypes.STRING },
    email_address: { type: DataTypes.STRING },
    contact_number: { type: DataTypes.STRING(15) },
    complete_address: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN },
    otp_id: { type: DataTypes.UUID },
  },
  { freezeTableName: true }
);
const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    rental_id: { type: DataTypes.INTEGER },
    payment_type: { type: DataTypes.INTEGER },
    paid_by: { type: DataTypes.STRING },
    payment_date: { type: DataTypes.DATE },
    remarks: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
  },
  { freezeTableName: true }
);
const Penalty = sequelize.define(
  "penalty",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    rental_id: { type: DataTypes.INTEGER },
    penalty_amount: { type: DataTypes.DECIMAL(15, 2) },
    payment_status: { type: DataTypes.BOOLEAN },
    remarks: { type: DataTypes.STRING },
    paid_by: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
  },
  { freezeTableName: true }
);
const Token = sequelize.define(
  "token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    table_name: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
    user_os: { type: DataTypes.STRING },
    user_browser: { type: DataTypes.STRING },
    user_device: { type: DataTypes.STRING },
    token: { type: DataTypes.STRING(1000) },
  },
  { freezeTableName: true }
);
const Otp = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    otp: { type: DataTypes.STRING },
    expiration_time: { type: DataTypes.DATE },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { freezeTableName: true }
);

// User.hasMany(Shopinfo, {
//   foreignKey: {
//     name: "updated_by",
//     allowNull: false,
//     onUpdate: "RESTRICT",
//     onDelete: "RESTRICT",
//   },
// });
// User.hasMany(Rental, {
//   foreignKey: {
//     name: "user_id",
//     allowNull: false,
//     onUpdate: "RESTRICT",
//     onDelete: "RESTRICT",
//   },
// });
// User.hasMany(Adsmanagment, {
//   foreignKey: {
//     name: "user_id",
//     allowNull: false,
//     onUpdate: "RESTRICT",
//     onDelete: "RESTRICT",
//   },
// });
// User.hasMany(Penalty, {
//   foreignKey: {
//     name: "user_id",
//     allowNull: false,
//     onUpdate: "RESTRICT",
//     onDelete: "RESTRICT",
//   },
// });
// User.hasMany(Payment, {
//   foreignKey: {
//     name: "user_id",
//     allowNull: false,
//     onUpdate: "RESTRICT",
//     onDelete: "RESTRICT",
//   },
// });
// User.hasMany(Bikeinfo, {
//   foreignKey: {
//     name: "user_id",
//     allowNull: false,
//     onUpdate: "RESTRICT",
//     onDelete: "RESTRICT",
//   },
// });
// Usergroup.hasMany(User, {
//   foreignKey: {
//     name: "user_category_id",
//     allowNull: false,
//     onUpdate: "RESTRICT",
//     onDelete: "RESTRICT",
//   },
// });
module.exports = {
  Shopinfo,
  User,
  Adsmanagment,
  Usergroup,
  Rental,
  Bikecategory,
  Bikeinfo,
  Client,
  Payment,
  Penalty,
  Token,
  Otp,
};
