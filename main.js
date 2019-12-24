const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 100000 }
}))
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
})
app.get('/login', function (req, res) {
    if (req.session.loggedIn === 1) {
        return res.redirect('/dashboard');
    }

    return res.sendFile(path.join(__dirname, 'login.html'));
})
app.post('/login', function (req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    if (email === 'shital' && password === 'gaikwad') {
        req.session.loggedIn = 1;
        return res.json({ message: "you are logged in successfully" })

    }
    return res.status(401).json({ message: "invalid details" })
});

app.get('/dashboard', function (req, res) {
    return res.sendFile(path.join(__dirname, 'dashboard.html'));
})
app.post('/logout', function (req, res) {
    req.session.destroy(function (error) {
        if (!error) {
            return res.json({ msg: "logout success" })
        }

    })
})

app.get('/profile', function (req, res) {
    if (req.session.loggedIn === 1) {
        return res.sendFile(path.join(__dirname, 'profile.html'));
    }
    return res.redirect('/');
})
app.listen(8000);