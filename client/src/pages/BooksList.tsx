import { Button, Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { listBooks, Book } from "../api/book";
import "./BooksList.scss";

export const BooksList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [pageToLoad, setPageToLoad] = React.useState(1);
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);

      const newBooks = await listBooks(pageToLoad);

      setBooks(existingBooks => [...existingBooks, ...newBooks]);
      setLoading(false);
    })();
  }, [pageToLoad]);

  return (
    <div className="books-list-page">
      <div className="books-container">
        {books.map(book => (
          <div key={book.id} className="book-item" onClick={() => navigate(`detail/${book.id}`)}>
            <div className="image">{book.image ? <img src={book.image} alt={book.title} /> : ""}</div>
            <div className="title">
              <h5>{book.title}</h5>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        {loading ? (
          <Spin />
        ) : (
          <Button type="primary" onClick={() => setPageToLoad(p => p + 1)}>
            Load more books
          </Button>
        )}
      </div>
    </div>
  );
};
