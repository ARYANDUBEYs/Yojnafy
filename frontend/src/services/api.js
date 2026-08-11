import { dummySchemes } from "../data/schemes";

export async function getSchemes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummySchemes);
    }, 1000);
  });
}
