import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({
  children,
  title,
  description,
  keywords,
  author,
}) {
  return (
    <div className="layout-container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "100vh" }} className="layout-children">
        {children}
      </main>

      <Footer />
    </div>
  );
}

// Default Props

MainLayout.defaultProps = {
  title: "Youtube Channels for Sale",
  description:
    "Mern Stack Project with React JS, Node JS, Express JS, MongoDB, BootStrap , CSS3, HTML5, JavaScript, & Tailwind CSS ",
  keywords: "Sell Youtube Channels",
  author: "M Salman",
};
