import { getMessages } from "@/lib/actions/messages";
import MessagesClient from "./client";

export default async function MessagesPage() {
  const messages = await getMessages();
  return <MessagesClient messages={messages} />;
}
