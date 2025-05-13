const TextInput = ({ input, setInput, sendMessage }) => {
  const onSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };
  return (
    <div className="w-full bg-violet-400 h-full rounded-full">
      <form className="flex h-full " onSubmit={onSendMessage}>
        <input
          className="w-full h-full bg-red-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="cursor-pointer px-4 h-full">
          Send
        </button>
      </form>
    </div>
  );
};

export default TextInput;
