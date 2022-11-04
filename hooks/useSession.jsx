import React, { useEffect, useState } from "react";

const useSession = (rid) => {
  const [player, setPlayer] = useState(undefined);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_HOST + `/player-data/${rid}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data);
      });

    return () => {};
  }, [rid]);

  return { player };
};

export default useSession;
