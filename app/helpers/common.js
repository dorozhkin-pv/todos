import {todoStorage} from "./localStorage";

export function ToDo(value) {
  return {
    id: todoStorage.uid++,
    title: value,
    completed: false
  };
}
