import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateRoomForm = ({ onHandleSubmit }) => {
  const [categories, setCategories] = useState(undefined);
  const router = useRouter();
  const { rid } = router.query;

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_HOST + "/categories", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const roomResponse = await fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST + "/create-room",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(
      "🚀 ~ file: CreateRoomForm.jsx ~ line 28 ~ onSubmit ~ formData",
      formData
    );

    const roomData = await roomResponse.json();
    console.log(
      "🚀 ~ file: CreateRoomForm.jsx ~ line 36 ~ onSubmit ~ roomData",
      roomData
    );

    const authResponse = await fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST + `/auth/${roomData.id}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );

    const authData = await authResponse.json();

    console.log(
      "🚀 ~ file: CreateRoomForm.jsx ~ line 44 ~ onSubmit ~ authData",
      authData
    );

    router.push("/rooms/" + roomData.id);
  };

  return (
    <section className="overflow-hidden rounded border border-black lg:self-start lg:basis-[40%]">
      <div className="bg-gray-200 p-2 basis-1/3 border-b border-black">
        New Room
      </div>
      <div className="p-4 bg-gray-300 ">
        <form
          className="flex flex-col gap-2"
          action=""
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="flex flex-col xl:flex-row">
            <label className="xl:basis-1/4" htmlFor="room">
              Room name
            </label>
            <input
              type="text"
              id="name"
              className="p-2 rounded xl:flex-1 border border-black"
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex flex-col xl:flex-row">
            <label className="xl:basis-1/4" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="p-2 rounded xl:flex-1 border border-black"
              {...register("password", { required: true })}
            />
          </div>

          <div className="flex flex-col xl:flex-row">
            <label className="xl:basis-1/4" htmlFor="creator">
              Nickname
            </label>
            <input
              type="text"
              id="creator"
              className="p-2 rounded xl:flex-1 border border-black"
              {...register("nickname", { required: true })}
            />
          </div>

          <div className="flex flex-col xl:flex-row ">
            <label className=" xl:basis-1/4 " htmlFor="game">
              Game
            </label>
            <select
              type="text"
              id="game"
              className="p-2 rounded xl:flex-1 border border-black"
              {...register("game", { required: true })}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          <label className="w-fit" htmlFor="isHidden">
            <input
              type="checkbox"
              id="isHidden"
              className="mr-2"
              {...register("isHidden")}
            />
            Hide card initially
          </label>

          <input
            type="submit"
            name="submit"
            id="submit"
            className=" bg-white px-4 py-2 self-end rounded border border-black"
          />
        </form>
      </div>
    </section>
  );
};

export default CreateRoomForm;
