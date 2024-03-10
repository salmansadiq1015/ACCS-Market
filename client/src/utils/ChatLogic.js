export const getSender = (userId, users) => {
  return users[0]._id === userId ? users[1].name : users[0].name;
};
