const app = require("./modules/app/app");
const port = process.env.PORT || 8080;
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.listen(port, () => {
  console.log(`[petful-server] Listening on ${port}.`);
});
