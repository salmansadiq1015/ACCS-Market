import React from "react";
import "./blogs.css";
import MainLayout from "../../components/MainLayout";
import UserBlogs from "../../components/user/UserBlogs";

export default function Blog() {
  return (
    <MainLayout title={"Blogs-infraDev"}>
      <div className="blog-wrapper">
        <section className="bsection1" data-aos="fade-up">
          <div className="bs1-content">
            <h3>Blog</h3>
            <h2>The latest articles and news</h2>
            <p>
              Stay up-to-date with the latest industry news as our marketing
              teams finds new ways to re-purpose old CSS tricks articles.
            </p>
          </div>
        </section>

        {/* ------------Lines------------ */}
        <div className="lines ml-[2rem]" data-aos="fade-up">
          <span></span>
          <span></span>
        </div>

        {/* -------------Blog Section--------- */}
        <section className="section2-blog-wrapper" data-aos="fade-up">
          <UserBlogs />
        </section>
      </div>
    </MainLayout>
  );
}
