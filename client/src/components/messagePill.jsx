const MessagePill = ({ message, chattingUserName }) => {
  console.log({ message, chattingUserName });

  return (
    <li
      className={`w-fit px-6 py-2 rounded-t-2xl m-2 ${
        message.fromMe
          ? "bg-amber-200 rounded-bl-2xl self-end text-right"
          : "bg-green-200 rounded-br-2xl self-start text-left"
      }`}
    >
      <p className="text-left text-3xl ">{message?.message}</p>
    </li>
  );
};

export default MessagePill;
