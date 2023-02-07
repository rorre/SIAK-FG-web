import { JSX } from "solid-js";

interface Props {
  title: string;
  children: JSX.Element;
  class?: string;
}
export default function Box(props: Props) {
  return (
    <div class={`rounded-xl flex flex-col bg-slate-700 ${props.class}`}>
      <div class="bg-slate-800 px-8 py-4 font-bold">{props.title}</div>
      <div class="px-8 py-4">{props.children}</div>
    </div>
  );
}
