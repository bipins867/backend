const { DataTypes } = require("sequelize");
const sequelize = require("./database"); // adjust the path as necessary

const CrimeReport = sequelize.define(
  "CrimeReport",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reportId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 15], // Adjust length according to phone number format
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typesOfCrime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evidenceImage: {
      type: DataTypes.STRING, // URL stored as a string
      allowNull: true, // Evidence image is optional
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    tableName: "CrimeReports", // You can define a custom table name
  }
);

module.exports = CrimeReport;
