import { createEffect, createResource, JSX, useContext } from "solid-js";
import { AuthContext } from "~/components/AuthContext";

export default function Main() {
  const { authenticated, user, wrappedFetch } = useContext(AuthContext);
  const [userPhoto] = createResource(() =>
    wrappedFetch(`${import.meta.env.VITE_API_URL}/photo`)
  );
  if (!authenticated()) {
    return <p>ksabar</p>;
  }

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

  const u = user()!;
  return (
    <main class="container mx-auto flex flex-col gap-4 py-8">
      {/* @ts-ignore */}
      <img ref={imgContainer} class="max-w-xs mx-auto" />
      <h1 class="font-bold text-2xl text-center">Halo, {u.name}</h1>
      <p class="text-center">
        {u.role} | {u.group}
      </p>
    </main>
  );
}
