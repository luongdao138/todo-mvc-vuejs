import { ref } from "vue";
import { useEventListener } from "@/hooks/useEventListener.js";

export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0);
  const y = ref(0);

  // a composable can update its managed state over time
  function update(event: MouseEvent) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  useEventListener(window, "mousemove", update);

  // a composable can expose managed state as return value
  return { x, y };
}
