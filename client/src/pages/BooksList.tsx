import React from "react";
import { Col, Row, Image } from "antd";
import { getBooks, Book } from "../api/book";

export const BooksList = () => {
  const [pageToLoad, setPageToLoad] = React.useState(1);
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    getBooks().then(newBooks => setBooks(existingBooks => [...existingBooks, ...newBooks]));
  }, [pageToLoad]);

  return (
    <div>
      {books.map(book => (
        <Row key={book.id}>
          <Col>{book.image && <Image src={book.image} />}</Col>
          <Col>{book.title}</Col>
        </Row>
      ))}
    </div>
  );
};
