const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config/config.env" });

const awsInstanceMetadata = require("aws-instance-metadata");
let instance = "";
let az = "";
awsInstanceMetadata.fetch("instance-id").then((instanceId) => {
  //console.debug(instanceId);
  instance = instanceId;
}, console.error);

awsInstanceMetadata
  .fetch("placement/availability-zone")
  .then((availabilityZone) => {
    //console.debug(availabilityZone);
    az = availabilityZone;
  }, console.error);

app.get("/", (req, res) => res.send(`Hello from ${instance} on ${az}`));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
