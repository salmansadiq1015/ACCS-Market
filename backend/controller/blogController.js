import blogModel from "../model/blogModel.js";
import userModel from "../model/userModel.js";

export const createBlogController = async (req, res) => {
  try {
    const { title, shotDesc, description, userId, image } = req.body;

    // Validation
    if (!title) {
      return res.status(401).send({ message: "Title is required!" });
    }
    if (!shotDesc) {
      return res.status(401).send({ message: "Shot description is required!" });
    }
    if (!description) {
      return res.status(401).send({ message: "Description is required!" });
    }
    if (!userId) {
      return res.status(401).send({ message: "UserId is required!" });
    }

    // Check Existing Blog
    const existingBlog = await blogModel.findOne({ title });
    if (existingBlog) {
      return res
        .status(201)
        .send({ message: "Blog of this name is already exist!" });
    }

    const user = await userModel.findById(userId).select("-avatar");

    // Save Blog

    const blog = await new blogModel({
      title,
      shotDesc,
      description,
      userId: user._id,
      userName: user.name,
      image: image,
    });

    await blog.save();

    res.status(200).send({
      success: true,
      message: "Blog created successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating blog!",
      error,
    });
  }
};

// Get-Blog-Controller
export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.status(200).send({
      total: blogs.length,
      success: "true",
      message: "All blogs list!",
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while get all blogs!",
      error,
    });
  }
};

// Update Services Controller

export const updateBlogController = async (req, res) => {
  try {
    const { title, shotDesc, description, image } = req.body;
    // Validation
    if (!title) {
      return res.status(401).send({ message: "Title is required!" });
    }
    if (!shotDesc) {
      return res.status(401).send({ message: "Shot description is required!" });
    }
    if (!description) {
      return res.status(401).send({ message: "Description is required!" });
    }

    // Update Blog

    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { title, shotDesc, description, image },
      { new: true }
    );
    await blog.save();

    res.status(200).send({
      success: true,
      message: "Blog updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while updating blog!",
      error,
    });
  }
};

// Delete Blog Controller

export const deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Blog deleted successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while deleting blog!",
      error,
    });
  }
};

// Get Single Blog

export const singleBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    res.status(200).send({
      success: true,
      message: "Single Blog!",
      blog: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting single blog!",
      error,
    });
  }
};
