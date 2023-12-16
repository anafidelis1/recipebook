import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from "console";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(fileUpload());

let posts = [];

app.get("/", (req, res) => {
     res.render("index.ejs", {posts: posts}); 
})

app.get("/newpost", (req, res) => {
    res.render("newpost.ejs");
});

app.post("/upload", (req, res) => {
    const { image } = req.files;

    image.mv(__dirname + '/public/upload/' + image.name);

    const post = {title: req.body["title"],
    image: '/upload/' + image.name,
    description: req.body["description"],
    ingredients: req.body["ingredients"],
    howTo: req.body["howTo"]};

    posts.push(post);
        
    res.redirect("/");
    
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});