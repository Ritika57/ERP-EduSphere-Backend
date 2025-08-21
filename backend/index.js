
import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
});



