import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;