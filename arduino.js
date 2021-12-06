function generateValue(min, max) {
  return Math.random() * (max - min) + min;
}

let temp = 30;

module.exports = (client, topic, delay) =>
  setInterval(() => {
    temp = 30 + generateValue(0.09, 0.2);
    client.publish(topic, String(temp));
  }, delay);
