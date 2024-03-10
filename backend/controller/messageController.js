import chatModel from "../model/chatModel.js";
import messageModel from "../model/messageModel.js";
import userModel from "../model/userModel.js";

// Create Message
export const createMessages = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid data passed into request!" });
    }

    var newMessage = {
      sender: req.user.id,
      content: content,
      chat: chatId,
    };

    var message = await messageModel.create(newMessage);

    message = await message.populate("sender", "_id name email");
    message = await message.populate("chat");
    message = await userModel.populate(message, {
      path: "chat.users",
      select: "_id name email ",
    });

    // Update latest Message
    await chatModel.findByIdAndUpdate(
      chatId,
      {
        latestMessage: message.toObject(),
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Message created successfully!",
      messages: message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while create message!",
      error,
    });
  }
};

// Get Messages

export const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id;

    const messages = await messageModel
      .find({ chat: chatId })
      .populate("sender", "_id name email")
      .populate("chat");

    res.status(200).send({
      success: true,
      messages: messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while get messages!",
      error,
    });
  }
};
