const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route.js");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use("/api/items", userRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
