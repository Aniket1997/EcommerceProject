const connectDB = require('./Config/db');
const app = require('./app');
const { SERVER_PORT } = require('./secret');

app.listen(SERVER_PORT,async () => {
    console.log(`listening on http://localhost:${SERVER_PORT}`);
    await connectDB();
});
