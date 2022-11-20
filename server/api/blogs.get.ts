import fs from "fs";

export default defineEventHandler(
  async () => JSON.parse(fs.readFileSync('C:\\SourceCode\\sample-app\\db.json', "utf-8")).articles
);