import Link from "next/link";
import React from "react";

export default function RoomRow({ id, room, creator, game }) {
  return (
    <tr className="border-b border-black last:border-b-0">
      <td className="pr-4">
        <Link href={"/rooms/" + id}>
          <a>{room}</a>
        </Link>
      </td>
      <td className="pr-4">{creator}</td>
      <td className="pr-4">{game}</td>
    </tr>
  );
}
