import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "../pages/Form/Form";
import Preview from "../pages/Preview/Preview";
import Result from "../pages/Result/Result";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
