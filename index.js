require("dotenv").config();

const mqtt = require("mqtt");
const { InfluxDB } = require("influx");

const influx = new InfluxDB(
  `http://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

const client = mqtt.connect(
  `mqtt://${process.env.BROKER_IP}:${process.env.BROKER_PORT}`
);

client.on("connect", () => {
  client.subscribe("iot/led");
  client.subscribe("iot/dht");
});

client.on("message", (topic, message) => {
  console.log(
    `[${new Date().toLocaleTimeString()}] - ${topic} received ${message}`
  );

  switch (topic) {
    case "iot/led":
      influx.writeMeasurement("led", [
        {
          fields: {
            value: message,
          },
        },
      ]);
      break;
    case "iot/dht":
      influx.writeMeasurement("dht", [
        {
          fields: {
            value: message,
          },
        },
      ]);
      break;
  }
});
