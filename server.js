const express = require('express');
const path = require('path');

const app = express();

//Znajdź i zwróć odpowiedni plik w views
app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

//Dostęp do zawartości public
app.use(express.static(path.join(__dirname, '/public')));

//Endpointy
app.get('/', (req, res) => {
    res.show('index.html')
});

app.get('/home', (req, res) => {
    res.show('index.html')
});

app.get('/about', (req, res) => {
    res.show('about.html')
});

//Middleware dla linków z 'user'
app.use('/user', (req, res, next) => {
    res.show('forbidden.html')
})

//Middleware dla 404
app.use((req, res) => {
    res.status(404).show('404.html');
});

app.listen(8000, () => {
    console.log("Server is running on port: 8000");
})