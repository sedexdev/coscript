const express = require("express");
const path = require("path");
const app = require("./app");

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("view/build"));
    // get('*') means any route not included above
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "view", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
