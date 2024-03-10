import chatModel from "../model/chatModel.js";
import userModel from "../model/userModel.js";

// Create Chat
export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User id is required!",
      });
    }

    let isChat = await chatModel
      .find({
        $and: [
          { users: { $elemMatch: { $eq: req.user.id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
      .populate("users", "-password -avatar")
      .populate("latestMessage");

    isChat = await userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email ",
    });

    if (isChat.length > 0) {
      return res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        users: [req.user.id, userId],
      };
    }

    const createdChat = await chatModel.create(chatData);

    const fullChat = await chatModel
      .findOne({ _id: createdChat._id })
      .populate("users", "-password -avatar");

    res.status(200).send({
      success: true,
      fullChat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create chat!",
    });
  }
};

// Fetch Chat Controller

export const fetchChat = async (req, res) => {
  try {
    const userId = req.params.id;

    await chatModel
      .find({
        users: {
          $elemMatch: { $eq: userId },
        },
      })
      .populate("users", "-password -avatar -code")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await userModel.populate(results, {
          path: "latestMessage.sender",
          select: "_id name email ",
        });
        res.status(200).send({ results: results });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetch chat!",
    });
  }
};
