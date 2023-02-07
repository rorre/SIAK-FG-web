import { useContext, createResource, createEffect } from "solid-js";
import { UserInfo } from "~/types";
import { AuthContext } from "./AuthContext";

interface Props {
  user: UserInfo;
}

export default function UserCard(props: Props) {
  const { wrappedFetch } = useContext(AuthContext);
  const [userPhoto] = createResource(() =>
    wrappedFetch(`${import.meta.env.VITE_API_URL}/photo`)
  );
  const u = props.user;

  let imgContainer: HTMLImageElement;
  createEffect(() => {
    if (!userPhoto()) return;

    userPhoto()
      ?.blob()
      .then((blob) => {
        let img = URL.createObjectURL(blob);
        imgContainer.src = img;
      });
  });

  return (
    <div class="rounded-xl px-8 py-4 bg-slate-700 flex flex-col-reverse md:flex-row justify-between gap-4 items-center">
      <div class="flex flex-col gap-2 grow">
        <h1 class="font-bold text-2xl text-center">Halo, {u.name}</h1>
        <p class="text-center">
          {u.role} | {u.group}
        </p>
      </div>

      <div class="avatar">
        <div class="w-24 rounded-xl">
          {/* @ts-ignore */}
          <img ref={imgContainer} class="mx-auto max-h-32 max-w-[128px]" />
        </div>
      </div>
    </div>
  );
}
