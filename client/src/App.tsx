import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";

import { BooksList } from "./pages/BooksList";
import { BookDetails } from "./pages/BookDetails";

const { Header, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Link to="/">Outlast BookStore</Link>
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<BooksList />} />
            <Route path="list" element={<BooksList />} />
            <Route path="detail/:id" element={<BookDetails />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
