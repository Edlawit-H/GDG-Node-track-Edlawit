import { bookSchema } from "../utils/validationSchema.js";

let books = [];
let idCounter = 1;

export const getAllBooks = (req, res) => {
  res.json(books);
};

export const searchBooks = (req, res) => {
  res.send("You are on the search page");
};

export const getBookById = (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

export const createBook = (req, res) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newBook = {
    id: idCounter++,
    ...req.body,
  };

  books.push(newBook);
  res.status(201).json(newBook);
};

export const deleteBook = (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);
  res.json({ message: "Book deleted successfully" });
};
