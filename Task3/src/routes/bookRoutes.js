import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  searchBooks,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.delete("/:id", deleteBook);

export default router;
