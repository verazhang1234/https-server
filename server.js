const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();

// Read SSL certificate (ensure key.pem and cert.pem are in the project root directory)
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};

// Security header configuration
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],  
            styleSrc: ["'self'", "'unsafe-inline'"],   
            imgSrc: ["'self'", "data:"]
        }
    },
    frameguard: { action: 'deny' }, 
    xssFilter: true,                
    noSniff: true,                   
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' } 
}));

// Parse JSON request body
app.use(express.json());

// API routes (with caching strategy)）
const cacheMiddleware = (seconds) => (req, res, next) => {
    res.set("Cache-Control", `public, max-age=${seconds}`);
    next();
};

// 1. Get all quests (cache for 5 minutes)
app.get("/quests", cacheMiddleware(300), (req, res) => {
    res.json([{ id: 1, name: "Daily Coding", xp: 100 }]);
});

// 2. Get a single quest (cache for 5 minutes)
app.get("/quests/:id", cacheMiddleware(300), (req, res) => {
    res.json({ id: req.params.id, name: "Complete a tutorial", xp: 200 });
});

// 3. Get leaderboard (cache for 10 minutes)
app.get("/leaderboard", cacheMiddleware(600), (req, res) => {
    res.json([{ user: "Alice", xp: 1200 }, { user: "Bob", xp: 900 }]);
});

// 4. Get user profile (no cache, may contain sensitive data)
app.get("/profile", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({ user: "Alice", level: 5, xp: 1200 });
});

// 5. Static files (cache non-sensitive data for 1 day)
app.use("/static", express.static(path.join(__dirname, "public"), {
    maxAge: "1d"
}));

// Start HTTPS server
https.createServer(options, app).listen(3000, () => {
    console.log("✅ Secure server running at https://localhost:3000");
});
