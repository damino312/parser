import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import ChartPage from "./pages/ChartPage/ChartPage";
import Layout from "./Layout"; // Предполагается, что вы импортировали компонент Layout

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/currency/:id" element={<ChartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
