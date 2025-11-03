import React from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
