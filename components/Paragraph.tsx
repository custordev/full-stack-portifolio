import React from "react";

export default function Paragraph({ text }: { text: string }) {
  return <p className="text-sm lg:text-base py-3">{text}</p>;
}
