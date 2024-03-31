import { Dotinto } from "./types";

declare global {
  interface Object {
    into: Dotinto;
  }
}
