const MessagePill = ({ message, currentUser }) => {
  console.log(message);
  return (
    <li
      className={`w-fit px-6 rounded-t-2xl m-2 ${
        message.userName === currentUser
          ? "bg-amber-200 rounded-bl-2xl self-end text-right"
          : "bg-green-200 rounded-br-2xl self-start text-left"
      }`}
    >
      <p className="text-left text-3xl font-semibold">{message?.userName}</p>
      <p className="text-left text-2xl ">{message?.text}</p>
    </li>
  );
};

export default MessagePill;
