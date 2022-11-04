import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import useSession from "../../hooks/useSession";

import ColorPicker from "../../components/room/ColorPicker";
import Chat from "../../components/room/Chat";
import Players from "../../components/room/Players";

import PlayerInfo from "../../components/room/PlayerInfo";
import BingoBoard from "../../components/room/BingoBoard";
import RoomSettings from "../../components/room/RoomSettings";

export default function Room() {
  const [room, setRoom] = useState(undefined);
  console.log("🚀 ~ file: [rid].jsx ~ line 17 ~ Room ~ room", room);
  const router = useRouter();
  const { rid } = router.query;
  const { player } = useSession(rid);
  const socketRef = useRef(undefined);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_HOST + "/", {
      transports: ["websocket"],
    });

    socket.on("update", async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_HOST + `/get-room/${rid}`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401 || response.status === 403)
        return router.push({
          pathname: "/rooms/auth/[rid]",
          query: { rid },
        });

      const data = await response.json();

      setRoom(data);
    });

    socket.emit("join-room", rid);
    socketRef.current = socket;

    return () => {
      socketRef.current.disconnect();
      fetch(
        process.env.NEXT_PUBLIC_SERVER_HOST +
          `/update-room/${rid}?event=remove-player`,
        {
          method: "POST",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };
  }, [rid]);

  useEffect(() => {
    const onBeforeUnload = (e) => {
      socketRef.current.disconnect();
      fetch(
        process.env.NEXT_PUBLIC_SERVER_HOST +
          `/update-room/${rid}?event=remove-player`,
        {
          method: "POST",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [socketRef.current]);

  const onColorClick = (color) => {
    fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST +
        `/update-room/${rid}?event=change-player-color`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ color }),
      }
    );
  };

  const onChatSubmit = async ({ input }) => {
    console.log("click");
    console.log(input);

    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST +
        `/update-room/${rid}?event=new-chat-message`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ msg: input }),
      }
    );
  };

  const onItemClick = async (item) => {
    await fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST +
        `/update-room/${rid}?event=update-item`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: item.id }),
      }
    );

    console.log("click");
  };

  const onGenerateNewBoardClick = async () => {
    if (room.items.some((item) => item.owners.length > 0)) {
      if (
        !confirm(
          "Are you sure you want a new board? This action will remove the current one"
        )
      )
        return;
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST +
        `/update-room/${rid}?event=generate-new-board`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ game: room.game }),
      }
    );
  };

  return (
    room &&
    socketRef &&
    player && (
      <section className="flex h-full w-full justify-center p-2 gap-2">
        <div className=" basis-2/5 flex flex-col grow shrink-0 gap-2 ">
          <BingoBoard room={room} onItemClick={onItemClick} />
        </div>
        <div className=" basis-1/4 flex grow-0 ">
          <Chat
            onChatSubmit={onChatSubmit}
            messages={room.chats}
            players={room.players}
          />
        </div>
        <div className="basis-1/5  flex flex-col gap-2">
          <ColorPicker
            currentColor={room.players[player.nickname].color}
            onColorClick={onColorClick}
            player={player}
          />
          <Players players={room.players} />
          <RoomSettings onGenerateNewBoardClick={onGenerateNewBoardClick} />
        </div>
      </section>
    )
  );
}

// export async function getServerSideProps({ query }) {
//   const { rid } = query;

//   return {
//     props: {
//       rid,
//     }, // will be passed to the page component as props
//   };
// }
