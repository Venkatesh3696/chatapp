const TextInput = ({ input, setInput, sendMessage }) => {
  const onSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };
  return (
    <div className="w-full flex justify-between h-16 p-2 rounded-full">
      <form className="flex h-full w-full" onSubmit={onSendMessage}>
        <input
          className="w-full h-full rounded-full bg-amber-100 p-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer px-10 h-full ml-10 rounded-full bg-green-500 text-white font-extrabold"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default TextInput;
