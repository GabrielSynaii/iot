require("dotenv").config();

const mqtt = require("mqtt");

const client = mqtt.connect(
  `mqtt://${process.env.BROKER_IP}:${process.env.BROKER_PORT}`
);

client.on("connect", () => {
  client.subscribe("test");
});

client.on("message", (topic, message) => {
  console.log({ topic, message: message.toString() });
});
