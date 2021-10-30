const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const books = [
	{
		id: 1,
		title: "The Pragmatic Programmer",
		author: "Andy Hunt / Dave Thomas",
		finished: true,
		createdAt: "2021-08-20T21:00:00.000Z",
	},
	{
		id: 2,
		title: "Clean Code",
		author: "Robert Cecil Martin",
		finished: true,
		createdAt: "2021-09-10T16:30:00.000Z",
	},
	{
		id: 3,
		title: "The Art of Computer Programming",
		author: "Donald Knuth",
		finished: false,
		createdAt: "2021-09-23T10:20:00.000Z",
	},
	{
		id: 4,
		title: "Head First Design Patterns",
		author: "Elisabeth Freeman / Kathy Sierra",
		finished: true,
		createdAt: "2021-10-1T20:00:00.000Z",
	},
	{
		id: 5,
		title: "JavaScript: The Good Parts",
		author: "Douglas Crockford",
		finished: false,
		createdAt: "2021-10-15T15:50:00.000Z",
	},
];

app.get("/", (req, res) => {
    res.status(200).send("This is the Books Express API");
})

app.get("/books", (req, res) => {
	res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
    const { id } = req.params;
	const book = books.find(book => book.id == id);
	if (book)
        res.status(200).json(book);
    else 
        res.status(404).json({message: `Could not find book with ID ${id}`});
});

app.post("/books", (req, res) => {
	const { title, author, finished } = req.body;

    if (!title || !author)
        res.status(400).json({message: "Cannot add book since title and author are required"});
    else {
        const newBook = {
            id: books.length + 1,
            title: title,
            author: author,
            finished: finished !== undefined ? finished : false,
            createdAt: new Date(),
        };
        books.push(newBook);
        res.status(201).json(newBook);
    }
});

// Add more API endpoints below this comment

// Add Swagger configuration options below this comment

app.listen(port, () => console.debug(`Server listening on port ${port}`));