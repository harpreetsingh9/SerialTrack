import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { organization } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins: [
    organization()
  ],
  emailAndPassword: {
    enabled: true,
  }
});
