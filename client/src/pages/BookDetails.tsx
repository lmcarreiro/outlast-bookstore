import { Col, Row, Image, Spin, Button } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { HeartFilled, HeartOutlined, LoadingOutlined } from "@ant-design/icons";

import "./BookDetails.scss";
import { getBook, Book } from "../api/book";
import { checkFavorite, saveFavorite } from "../api/favorite";

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
            <Button
              type={favorite ? "primary" : "ghost"}
              icon={
                typeof favorite === "undefined" ? <LoadingOutlined /> : favorite ? <HeartFilled /> : <HeartOutlined />
              }
              onClick={typeof favorite !== undefined ? () => saveFavorite(id, !favorite) : undefined}
            >
              Favorite
            </Button>
          </Col>
        </Row>
      ) : (
        <Spin />
      )}
    </div>
  );
};
