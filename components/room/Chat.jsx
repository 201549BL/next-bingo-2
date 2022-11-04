import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Chat = ({ onChatSubmit, messages }) => {
  const endOfChatRef = useRef(undefined);

  const { register, handleSubmit, formState, reset } = useForm();

  useEffect(() => {
    endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" flex flex-col w-full border border-black rounded overflow-hidden">
      <div className="bg-gray-100 border-b border-black p-2">Chat</div>
      <div className=" bg-gray-200 overflow-y-scroll overflow-x-auto grow px-4">
        {messages &&
          messages.map((chat) => (
            <p className="text-sm" key={chat.id}>
              <span className=" text-gray-600 pr-2">{chat.timestamp}</span>
              <span className="pr-2" style={{ color: chat.color }}>
                {chat.nickname}
              </span>
              {chat.text ? <span>{chat.text}</span> : null}
              <span style={{ color: chat.color }}>{chat.message}</span>
            </p>
          ))}
        <div ref={endOfChatRef}></div>
      </div>
      <div className=" bg-gray-200 ">
        <form
          className=" p-1 flex gap-1  "
          onSubmit={handleSubmit((data) => {
            onChatSubmit(data);
            reset();
          })}
        >
          <input
            className=" border border-black flex-1 rounded overflow-hidden px-2"
            type="text"
            {...register("input")}
          />
          <input
            className="  px-4 py-2 bg-white border border-black rounded"
            type="submit"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
