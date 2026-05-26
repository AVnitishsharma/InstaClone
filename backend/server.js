import app from './src/app.js';
const port = process.env.PORT || 3000;
import connectDB from './src/config/db.js';

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
