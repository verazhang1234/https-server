# https-server

## Setup Instructions
1. Clone this repository to your local machine
2. Install dependencies：
Ensure you have Node.js and npm installed. Run the command to install necessary dependencies: npm install
3. SSL Certificates
- using OpenSSL, run the command: openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
4. Start the secure server: node server.js
5. Open https://localhost:3000 in your browser.


## SSL configuration
- The application uses Helmet.js to set various security headers to protect against common web vulnerabilities.
The server uses HTTPS for secure communication. SSL certificates are required to run the server securely.
The following code reads the SSL certificate files key.pem and cert.pem:
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};
- Ensure that both the key.pem and cert.pem files are placed in the root directory of your project.
The server is then created using these certificates:
https.createServer(options, app).listen(3000, () => {
    console.log("✅ Secure server running at https://localhost:3000");
});
### Headers ###
- Content Security Policy (CSP): Prevents XSS attacks
- Strict-Transport-Security: Forces HTTPS
- X-Frame-Options: Prevents clickjacking
- X-Content-Type-Options: Prevents MIME sniffing
- Referrer-Policy: Protects user privacy


## Caching Strategy for Routes
- /quests and /quests/:id : Cached for 5 minutes.
Improves performance, reduces server load, safe for caching.
- /leaderboard: Cached for 10 minutes.
Improves performance, better user experience, safe for caching.
- /profile: Not cached (no cache, as it may contain sensitive data).
Security (no sensitive data cached), ensures fresh data for the user.
- /static: Cached for 1 day (for non-sensitive static files like images, styles, etc.).
Improves performance, reduces server load, safe for caching.


## Lessons learned
- Challenge: Self-signed certificates cause browser warnings
Solution: Manually trust the certificate
- Challenge: Debugging Cannot GET /quests
Solution: Added proper Express route definitions in server.js
