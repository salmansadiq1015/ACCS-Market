import MainLayout from "../MainLayout";
import React, { useEffect, useState } from "react";
import "./bdetails.css";
import { useParams } from "react-router-dom";
import moment from "moment";
// import parse from "html-react-parser";
import axios from "axios";

export default function BlogDetails() {
  const params = useParams();
  const [data, setData] = useState("");
  console.log("data", data);

  //   Get Single Blog
  const getSingleBlog = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/blogs/single-blog/${params?.id}`
      );
      setData(data?.blog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBlog();
    // eslint-disable-next-line
  }, []);
  return (
    <MainLayout>
      <div className="blog-details-wrapper">
        <div className="blog-detail-container">
          <div data-aos="fade-up" className="blogdetail-header">
            <span>{moment(data?.createdAt).format("MMMM D, YYYY")}</span>
            <h1>{data?.title}</h1>
            <p>{data?.userName}, Admin</p>
          </div>
          <div className="blogdetail-content1" data-aos="fade-up">
            {/* {parse(data?.description)} */}
            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          </div>
        </div>

        {/*-------------------- Section 2-------------- */}
        {/* <section className="blog-detail-section2" data-aos="fade-up">
          <Section8 />
        </section> */}
      </div>
    </MainLayout>
  );
}
