require("dotenv").config();

const mqtt = require("mqtt");

const client = mqtt.connect(
  `mqtt://${process.env.BROKER_IP}:${process.env.BROKER_PORT}`
);

client.on("connect", () => {
  client.subscribe("iot/led");
});

client.on("message", (topic, message) => {
  switch (topic) {
    case "iot/led":
      console.log({ topic, message: message.toString() });
      break;
  }
});
