import channelModel from "../model/channelModel.js";

// Create Sell Channel
export const createSellChannel = async (req, res) => {
  try {
    const {
      userId,
      name,
      userName,
      logo,
      channelLink,
      subject,
      category,
      subscriber,
      price,
      monotization,
      allowComment,
      description,
      contentType,
      income,
      expense,
      support,
      images,
      // code,
    } = req.body;

    console.log(category);

    // validation
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category is required! ",
      });
    }
    if (
      !channelLink ||
      !subject ||
      !name ||
      !subscriber ||
      !category ||
      !price ||
      !monotization ||
      !allowComment
    ) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    // Save Data
    const channel = await channelModel.create({
      userId,
      name,
      userName,
      logo,
      channelLink,
      subject,
      category,
      subscriber,
      price,
      monotization,
      allowComment,
      description,
      contentType,
      income,
      expense,
      support,
      images,
    });
    // Response
    res.status(200).send({
      success: true,
      message: "Sell channel created successfully!",
      channel: channel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating sell channel",
      error,
    });
  }
};

// Get ALL Channels
export const getAllChannels = async (req, res) => {
  try {
    const channels = await channelModel.find({});

    res.status(200).send({
      success: true,
      message: "All channels list!",
      channels: channels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting channels controller",
      error,
    });
  }
};

// Get Single User Channel
export const getSingleChannel = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User Id is required!",
      });
    }
    const channels = await channelModel.find({ userId: userId });
    if (!channels) {
      return res.status(400).send({
        success: false,
        message: "Channel not found with this user Id!",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "User Channels list!",
        channels: channels,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single channel controller",
      error,
    });
  }
};

// Get Update User Channel
export const UpdateSingleChannel = async (req, res) => {
  try {
    const channelId = req.params.id;
    const {
      userId,
      name,
      userName,
      logo,
      channelLink,
      subject,
      category,
      subscriber,
      price,
      monotization,
      allowComment,
      description,
      contentType,
      income,
      expense,
      support,
      images,
      status,
    } = req.body;

    const existingChannel = await channelModel.findById({ _id: channelId });
    if (!existingChannel) {
      return res.status(400).send({
        success: false,
        message: "Channel not found!",
      });
    }

    const channel = await channelModel.findByIdAndUpdate(
      existingChannel._id,
      {
        userId,
        name,
        userName,
        logo,
        channelLink,
        subject,
        category,
        subscriber,
        price,
        monotization,
        allowComment,
        description,
        contentType,
        income,
        expense,
        support,
        images,
        status,
      },
      { new: true }
    );
    // Response
    res.status(200).send({
      success: true,
      message: "Channel updated successfully!",
      channel: channel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update channel controller",
      error,
    });
  }
};

// Get Delete User Channel
export const deleteSingleChannel = async (req, res) => {
  try {
    const channelId = req.params.id;

    await channelModel.findByIdAndDelete(channelId);

    res.status(200).send({
      success: true,
      message: "Channel deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete single channel controller",
      error,
    });
  }
};

// Get Single By User
export const SingleChannel = async (req, res) => {
  try {
    const channelId = req.params.id;

    const channel = await channelModel.findById(channelId);
    if (!channel) {
      return res.status(400).send({
        success: false,
        message: "Channel not found!",
      });
    } else {
      res.status(200).send({
        success: true,
        message: " User channel!",
        channel: channel,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in single channel controller",
      error,
    });
  }
};

// Update Status
export const updateChannelStatus = async (req, res) => {
  try {
    const channelId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Status is required!",
      });
    }

    const updateStatus = await channelModel.findByIdAndUpdate(
      channelId,
      { $set: { status: status } },
      { new: true }
    );
    updateStatus.save();

    res.status(200).send({
      success: true,
      message: "Status updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while update Status",
      error,
    });
  }
};
