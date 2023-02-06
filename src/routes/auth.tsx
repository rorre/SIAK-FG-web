import { createSignal, useContext } from "solid-js";
import toast from "solid-toast";
import { AuthContext } from "~/components/AuthContext";

export default function Auth() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  async function onFormSubmit(e: Event) {
    e.preventDefault();

    const res = await login(username(), password());
    if (res.status == 200) {
      toast.success("Logged in!");
    }
  }

  return (
    <main class="container mx-auto py-4">
      <h2 class="mx-auto text-center text-4xl font-bold my-8">Login</h2>
      <form class="flex flex-col gap-2">
        <input
          name="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="Username"
          class="input input-bordered w-full"
        />
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Password"
          class="input input-bordered w-full"
        />
        <button class="btn btn-primary" onClick={onFormSubmit}>
          Login
        </button>
      </form>
    </main>
  );
}
