import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { BiSolidImageAdd } from "react-icons/bi";
import { useAuth } from "../../context/authContext";
import { TbLoader } from "react-icons/tb";
import toast from "react-hot-toast";
import { CgCloseR } from "react-icons/cg";

export default function CreateBlog({
  setIsShow,
  getAllBlogs,
  blogId,
  setBlogId,
}) {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [shotDesc, setShotDesc] = useState("");
  const [description, setDescription] = useState("");
  const { auth } = useAuth();
  const [image, setImage] = useState("");
  const [load, setLoad] = useState(false);

  //----------Banner Image------->
  const postLogo = (image) => {
    setLoad(true);

    if (!image) {
      toast.error("Please select an image!");
      setLoad(false);
      return;
    }

    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/jpg" ||
      image.type === "image/*"
    ) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "socket.io");
      formData.append("cloud_name", "dat1f5g7r");

      fetch("https://api.cloudinary.com/v1_1/dat1f5g7r/image/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          setLoad(false);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          toast.error("Error uploading image");
          setLoad(false);
        });
    } else {
      toast.error(
        "Invalid file format! Please select a valid image file (jpeg, png,jpg)."
      );
      setLoad(false);
    }
  };

  // ---------Create Blog----------
  const handleBlog = async (e) => {
    e.preventDefault();
    try {
      if (blogId) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/blogs/update-blog/${blogId}`,
          {
            title,
            shotDesc,
            description,
            image,
          }
        );
        if (data.success) {
          getAllBlogs();
          setBlogId("");
          toast.success(data.message);
          setIsShow(false);
        }
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/blogs/create-blog`,
          {
            title,
            shotDesc,
            description,
            userId: auth.user.id,
            image,
          }
        );
        if (data?.success) {
          getAllBlogs();
          toast.success(data?.message);
          setIsShow(false);
          setDescription("");
          setImage("");
          setShotDesc("");
          setTitle("");
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      toast.error("Error while creating blogs");
    }
  };

  const getSingleBlogs = async () => {
    if (!blogId) {
      return console.log("Blog id is required");
    }
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/blogs/single-blog/${blogId}`
      );
      if (data) {
        setTitle(data?.blog.title);
        setShotDesc(data?.blog.shotDesc);
        setDescription(data?.blog.description);
        setImage(data?.blog.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBlogs();
    // eslint-disable-next-line
  }, [blogId]);

  // Editor configuration
  const config = {
    readonly: false,
    contentCss: "body { color: red; }",
    height: 450,
    width: 1000,
    color: "red",
  };

  return (
    <div className="w-full h-full flex items-center justify-center mt-[1.5rem] pb-4 scroll-smooth">
      <div className="w-[20rem] sm:w-[33rem] rounded-md flex flex-col gap-4">
        <form onSubmit={handleBlog} className="flex flex-col gap-4">
          {/* Banner Image */}
          <div className="relative w-full overflow-hidden object-fill rounded-md shadow-md border-dashed border-2 border-fuchsia-600 flex items-center justify-center flex-col gap-4 h-[14rem]">
            <input
              type="file"
              id="selectBanner"
              accept="image/*"
              required
              onChange={(e) => postLogo(e.target.files[0])} // Make sure to pass e.target.files[0] to postLogo function
              className="hidden"
            />
            {image ? (
              <div className=" relative w-full overflow-hidden object-fill rounded-md shadow-md flex items-center justify-center flex-col gap-4 h-[14rem]">
                <label
                  className="absolute top-3 right-3 z-50"
                  htmlFor="Blog-banner"
                  onClick={() => setImage("")}
                >
                  <CgCloseR size={28} className="text-black" />
                </label>
                <img
                  src={image}
                  alt="Banner"
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-lg"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="selectBanner"
                  className="flex flex-col gap-3 cursor-pointer items-center justify-center"
                >
                  {load ? (
                    <TbLoader className="h-5 w-5 text-fuchsia-500 animate-spin" />
                  ) : (
                    <BiSolidImageAdd size={32} color="orangered" />
                  )}
                  <span>{load ? "Uploading..." : "Add Banner"}</span>
                </label>
              </div>
            )}
          </div>
          {/* Inputs */}
          <div className="inputs">
            <input
              type="text"
              placeholder="Blog title..."
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              title="Enter Blog Title"
              className="w-full h-[2.8rem] rounded-md shadow-md border-2 border-gray-700 py-1 px-3"
            />
          </div>
          <textarea
            placeholder="Short description..."
            required
            value={shotDesc}
            onChange={(e) => setShotDesc(e.target.value)}
            title="Enter blog short description"
            className="w-full h-[4rem] rounded-md resize-none shadow-md border-2 border-gray-700 px-3 py-1"
          />
          <JoditEditor
            ref={editor}
            value={description}
            config={config}
            color="#fff"
            tabIndex={1}
            onBlur={(newContent) => setDescription(newContent)}
          />
          <div className="flex items-center justify-end">
            <button
              style={{
                cursor: "pointer",
                padding: ".5rem 1rem",
                textShadow: ".2rem .3rem .3rem rgba(0,0,0,.3)",
              }}
              className="bg-sky-500 hover:bg-sky-600 transition rounded-3xl text-white w-[]"
              type="submit"
              onClick={handleBlog}
            >
              {blogId ? "Update & close" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
