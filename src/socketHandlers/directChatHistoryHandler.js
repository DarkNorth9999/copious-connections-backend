const Conversation = require("../models/conversation")
const chatUpdates = require("./updates/chat")

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user
    const { receiverUserId } = data

    console.log("UserId is ", userId, " Receiver id is ", receiverUserId)

    // const conversation = await Conversation.findOne({
    //   participants: { $all: [userId, receiverUserId] },
    //   type: "DIRECT",
    // })

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    })

    if (conversation) {
      console.log("conversation exists")
      chatUpdates.updateChatHistory(conversation._id.toString(), socket.id)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = directChatHistoryHandler
