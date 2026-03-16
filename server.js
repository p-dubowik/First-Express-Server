const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');



//Dostęp do zawartości public
app.use(express.static(path.join(__dirname, '/public')));

//Obsługa formularzy
app.use(express.urlencoded({ extended: false }));

//Odbieranie danych JSON
app.use(express.json());

//Endpointy
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/home', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('about', {layout: 'dark'})
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.get('/history', (req, res) => {
    res.render('history')
});

app.get('/info', (req, res) => {
    res.render('info')
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', {name: req.params.name});
});

app.post('/contact/send-message', upload.single('design'), (req, res) => {
    
    const { author, sender, title, message } = req.body;
    const design = req.file;

    if(author && sender && title && message && design){
        res.render('contact', {isSent: true, fileName: design.originalname});
    }
    else{
        res.render('contact', {isError: true});
    }
});

//Middleware dla linków z 'user'
app.use('/user', (req, res, next) => {
    res.render('forbidden')
})

//Middleware dla 404
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(8000, () => {
    console.log("Server is running on port: 8000");
})