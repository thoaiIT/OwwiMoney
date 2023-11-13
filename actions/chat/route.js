exports.sendMessage = async (socket, data) => {
  console.log('vl');
  // const users = await prisma.user.findMany();
  // console.log({ users });
  const rd = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  if (data.action === 'push') {
    socket.emit('chat', {
      action: 'pushed',
      message: String(rd),
    });
  }
};
