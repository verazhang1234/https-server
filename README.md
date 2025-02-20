# https-server

Setup Instructions
1.Clone this repository to your local machine
2.Install dependencies
Ensure you have Node.js and npm installed. Run the command to install necessary dependencies: npm install
3.SSL Certificates
For the server to run securely over HTTPS, you need SSL certificates.
Place your key.pem and cert.pem files in the root of your project directory. These files are required for the server to handle HTTPS connections.
4.Start the server
Once all dependencies are installed and SSL certificates are in place, you can start the server using the command:node app.js
Then the server will be running at https://localhost:3000.


SSL configuration
The application uses Helmet.js to set various security headers to protect against common web vulnerabilities
The server uses HTTPS for secure communication. SSL certificates are required to run the server securely.
The following code reads the SSL certificate files key.pem and cert.pem:
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};
Ensure that both the key.pem and cert.pem files are placed in the root directory of your project.
The server is then created using these certificates:
https.createServer(options, app).listen(3000, () => {
    console.log("✅ Secure server running at https://localhost:3000");
});
Headers
Content Security Policy (CSP): Restricts which sources the browser can load resources from.
Frameguard: Prevents the site from being embedded in a frame (clickjacking prevention).
XSS Filter: Protects against cross-site scripting (XSS) attacks.
NoSniff: Prevents browsers from interpreting files as a different MIME type.
Referrer Policy: Controls the amount of information sent with requests, preventing potential privacy leaks.


Caching Strategy for Routes
/quests and /quests/:id : Cached for 5 minutes.
Improves performance, reduces server load, safe for caching.
/leaderboard: Cached for 10 minutes.
Improves performance, better user experience, safe for caching.
/profile: Not cached (no cache, as it may contain sensitive data).
Security (no sensitive data cached), ensures fresh data for the user.
/static: Cached for 1 day (for non-sensitive static files like images, styles, etc.).
Improves performance, reduces server load, safe for caching.


Lessons learned
Self-signed certificates cause browser warnings
Solution: Manually trust the certificate
