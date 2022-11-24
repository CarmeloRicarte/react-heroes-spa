import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { DcPage } from "../heroes";
import { MarvelPage } from "../heroes";
import { Navbar } from "../ui";
export const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/marvel" />} />
        <Route path="marvel" element={<MarvelPage />} />
        <Route path="dc" element={<DcPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};
