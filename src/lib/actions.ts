import anime from "animejs";

export function buttonAnim(node: Node){
  (node as HTMLElement).classList.add("active:scale-90", "transition-transform", "duration-500")
}