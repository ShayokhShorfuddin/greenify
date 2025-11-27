import { v4 as uuidv4 } from "uuid";

// Generate unique ID
export function generateUniqueId() {
  return Date.now() + uuidv4();
}
