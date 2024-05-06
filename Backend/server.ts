import app from "./src/app";
import connectDB from "./src/config/db";
const startServer = async () => {
  await connectDB();
  const port = 3000;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};
startServer();
