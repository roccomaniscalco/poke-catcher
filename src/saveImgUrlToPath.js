import fetch from "node-fetch";
import { writeFileSync } from "fs";

const saveImgUrlToPath = async (imageUrl, path) => {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  writeFileSync(path, buffer);
};

export default saveImgUrlToPath;
