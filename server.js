const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});


app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;

  
    fs.appendFile('user_data.txt', userData, (err) => {
        if (err) throw err;
        console.log('User data saved!');
    });

    res.send('<h1>Signup Successful!</h1>');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
