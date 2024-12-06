require("dotenv").config();

const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const { google } = require("googleapis");
const passport = require("passport");
const { OAuth2Strategy } = require("passport-google-oauth");

// express
const app = express();
app.use(cors({ origin: "https://yourdomain.com", methods: ["GET"] }));

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, { accessToken, email: profile.emails[0].value }); // Store the access token
    },
  ),
);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use(passport.initialize());

// HTTPS configuration
const HTTPS_PORT = process.env.HTTPS_PORT || 8555;
const sslOptions = {
  key: fs.readFileSync("path_to_key"),
  cert: fs.readFileSync("path_to_cert"),
};

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "email",
      "profile",
    ],
  }),
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/inbox");
  },
);
// Ensure authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
}

// Fetch  emails
app.get("/inbox", ensureAuthenticated, async (req, res) => {
  const { accessToken } = req.user;
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  const gmail = google.gmail({ version: "v1", auth });

  try {
    // Fetch list
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 5, // ! Important: maxResults
      labelIds: ["INBOX"],
      q: "is:unread", // ! Important: only unread
    });

    const messageIds = response.data.messages || [];

    // Fetch messages
    const messages = await Promise.all(
      messageIds.map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });
        return message.data;
      }),
    );

    res.json(messages);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).send("Failed to fetch emails");
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`Server is listening on port ${HTTPS_PORT}`);
});
