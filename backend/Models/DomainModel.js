const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    domainName: {
      type: String,
      required: [true, "Please enter Domain name"],
    },
    dnsRecords: [
      {
        name: {
          type: String,
          required: [true, "Please enter DNS record name"],
        },
        type: {
          type: String,
          required: [true, "Please enter DNS record type"],
        },
        value: {
          type: String,
          required: [true, "Please enter DNS record value"],
        },
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("domain", domainSchema);
