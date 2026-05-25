import app from "./app.js"
import "dotenv/config"
import connectDB from "./config/db.js"

const PORT = process.env.PORT || 5000 

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Example app listening on port ' + PORT + '!')
    });
});
