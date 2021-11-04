import { Col, Row, Image, Spin } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

import "./BookDetails.scss";
import { getBook, Book } from "../api/book";
import { checkFavorite } from "../api/favorite";

export const BookDetails = () => {
  const params = useParams<"id">();
  const id = parseInt(params.id ?? "0");
  const [book, setBook] = React.useState<Book>();
  const [favorite, setFavorite] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    if (!id) return;
    getBook(id).then(setBook);
    checkFavorite(id).then(setFavorite);
  }, [id]);

  return (
    <div className="book-details-page">
      {typeof favorite} ---
      {JSON.stringify(favorite)}
      {book ? (
        <Row>
          <Col span={6}>{book.image ? <Image src={book.image} /> : <Image />}</Col>
          <Col span={18}>
            <h1>{book.title}</h1>
            <h3>Authors:</h3>
            <ul>
              {book.authors.map(a => (
                <li key={JSON.stringify(a)}>
                  {a.name} ({a.birth_year} - {a.death_year})
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      ) : (
        <Spin />
      )}
    </div>
  );
};
