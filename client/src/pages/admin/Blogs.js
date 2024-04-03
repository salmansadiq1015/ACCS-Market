import React, { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { IoAdd } from "react-icons/io5";
import CreateBlog from "../../components/admin/CreateBlog";
import { IoClose } from "react-icons/io5";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [blogId, setBlogId] = useState("");

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/blogs/get_blogs`
      );
      if (data) {
        console.log("Blogs:", data);
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // -------Handle Delete------>

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/blogs/delete-blog/${id}`
      );
      if (data?.success) {
        toast.success("Blog deleted successfully!", { duration: 2000 });
        getAllBlogs();
      }
    } catch (error) {
      toast.error("Error while delete blog!", {
        duration: 2000,
      });
    }
  };

  return (
    <Layout>
      {!isShow ? (
        <div className="relative w-full h-[85vh] sm:h-[88.5vh]  overflow-x-auto  hidden1 pb-[3rem] px-4 mt-3">
          <div className="flex items-start w-full sm:items-center justify-between  gap-4 flex-row">
            <h1 className="text-2xl sm:text-3xl font-bold  ">All Blogs</h1>
            <button
              className=" flex float-end items-center py-2 px-4 rounded-3xl cursor-pointer bg-fuchsia-500 text-white hover:bg-fuchsia-600 shadow-md hover:shadow-lg transition duration-150"
              onClick={() => {
                setBlogId("");
                setIsShow(true);
              }}
            >
              <IoAdd className="h-5 w-5 text-white" /> Add new blog
            </button>
          </div>

          <div className="relative w-full h-full overflow-x-auto hidden1   ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[1rem] py-4 ">
              {blogs?.map((blog) => (
                <div
                  className="Admin-blog-box max-w-[23rem] bg-white rounded-md cursor-pointer overflow-hidden border border-gray-400 shadow-md shadow-gray-300 "
                  key={blog._id}
                >
                  <div className="image">
                    <img
                      src={blog?.image}
                      alt={blog?.title}
                      className="w-full h-[15rem] border-b border-gray-400"
                    />
                    <div className="flex flex-col gap-3 p-2 mt-2 ">
                      <h3 className="text-black text-lg font-bold text-start">
                        {blog?.title}...
                      </h3>
                      <p className=" truncate text-slate-600 text-sm ">
                        {blog?.shotDesc}
                      </p>
                    </div>
                    <div className="admin-blog-buttons mt-3 flex items-center justify-between p-2">
                      <button
                        type="button"
                        className=" flex float-end items-center py-2 px-6 rounded-3xl cursor-pointer bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg transition duration-150"
                        onClick={() => {
                          setBlogId(blog._id);
                          setIsShow(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(blog._id)}
                        className=" flex float-end items-center py-2 px-6 rounded-3xl cursor-pointer bg-red-500 text-white hover:bg-res-600 shadow-md hover:shadow-lg transition duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[85vh] sm:h-[88.5vh]  overflow-x-auto  hidden1 pb-[3rem] px-4 mt-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold  ">
              {blogId ? "Update Blog" : "Add New Blog"}
            </h1>
            <span onClick={() => setIsShow(false)}>
              <IoClose className="h-6 w-6 cursor-pointer text-black hover:text-red-500" />
            </span>
          </div>
          <div className="  ">
            {/* relative w-full h-full overflow-x-auto hidden1 */}
            <CreateBlog
              setIsShow={setIsShow}
              getAllBlogs={getAllBlogs}
              blogId={blogId}
              setBlogId={setBlogId}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
