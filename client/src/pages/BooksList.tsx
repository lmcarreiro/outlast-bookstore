import React from "react";
import { getBooks, Book } from "../api/book";
import "./BooksList.scss";

export const BooksList = () => {
  const [pageToLoad, setPageToLoad] = React.useState(1);
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    getBooks().then(newBooks => setBooks(existingBooks => [...existingBooks, ...newBooks]));
  }, [pageToLoad]);

  return (
    <div className="books-list-page">
      {books.map(book => (
        <div key={book.id} className="book-item" onClick={() => {}}>
          <div className="image">{book.image ? <img src={book.image} alt={book.title} /> : ""}</div>
          <div className="title">
            <h5>{book.title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};
