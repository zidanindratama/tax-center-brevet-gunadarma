import NewsDetail from "@/components/(main)/berita/news-detail";
import Footer from "@/components/(main)/footer";
import Navbar from "@/components/(main)/navbar";
import React from "react";

const NewsDetailPage = () => {
  return (
    <div>
      <Navbar />
      <NewsDetail />
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
