import { createEffect, createResource, useContext } from "solid-js";
import { A } from "solid-start";
import { AuthContext } from "~/components/AuthContext";
import UserCard from "~/components/UserCard";

export default function Main() {
  const { user } = useContext(AuthContext);

  return (
    <main class="container mx-auto ">
      <div class="mx-4 xl:mx-0 flex flex-col gap-4 py-8">
        {user() !== null ? (
          <UserCard user={user()!} />
        ) : (
          <div
            class="radial-progress animate-spin mx-auto"
            style="--value:75;"
          />
        )}
        <div class="grid grid-cols-2 gap-2">
          <A href="/academic" class="btn btn-primary">
            Ringkasan Akademik
          </A>
          <A href="/academic/history" class="btn btn-accent">
            Riwayat Akademik
          </A>
          <A href="/schedule" class="btn btn-secondary">
            Jadwal
          </A>
          <button class="btn btn-error">Logout</button>
        </div>
      </div>
    </main>
  );
}
