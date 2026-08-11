function ChatBubble({ text, sender = "bot" }) {
  const isUser = sender === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[85%] items-end gap-2 sm:max-w-[70%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${
            isUser
              ? "bg-slate-200 text-slate-600"
              : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
          }`}
        >
          {isUser ? "👤" : "✨"}
        </div>

        {/* Message */}
        <div
          className={`px-4 py-3 text-sm leading-6 shadow-sm ${
            isUser
              ? "rounded-2xl rounded-br-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              : "rounded-2xl rounded-bl-md border border-slate-100 bg-white text-slate-700"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
