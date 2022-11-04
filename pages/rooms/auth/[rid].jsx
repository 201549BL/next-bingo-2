import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Auth() {
  const [error, setError] = useState(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const { rid } = router.query;

  const onSubmit = async (formData) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_HOST + `/auth/${rid}`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );

    console.log(response);

    const data = await response.json();

    if (response.status !== 200) return setError(data.msg);

    router.push({
      pathname: "/rooms/[rid]",
      query: { rid: rid },
    });
  };

  return (
    <section className="w-full flex flex-col justify-center items-center p-4">
      <div className="border border-black">
        <div className="bg-gray-200 border-b border-black p-2">Room: {rid}</div>
        <form
          className=" flex flex-col bg-slate-300 p-4 gap-4"
          onSubmit={handleSubmit((formData) => onSubmit(formData))}
        >
          <div className={` ${!error ? " hidden" : ""} `}>
            {error && (
              <p>
                <span className=" font-bold">Error: </span>
                {error}
              </p>
            )}
          </div>
          <div className=" flex flex-col xl:flex-row xl:items-center">
            <label className="basis-1/4 mr-2" htmlFor="nickname">
              Nickname
            </label>
            <input
              className=" p-2 rounded xl:flex-1 border border-black"
              type="text"
              id="nickname"
              {...register("nickname", { required: true })}
            />
          </div>
          <div className=" flex flex-col xl:flex-row xl:items-center">
            <label className="basis-1/4 mr-2" htmlFor="password">
              Password
            </label>
            <input
              className=" p-2 rounded xl:flex-1 border border-black"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <input
            className=" bg-white px-4 py-2 self-end rounded border border-black"
            type="submit"
          />
        </form>
      </div>
    </section>
  );
}
