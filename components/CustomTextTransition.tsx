"use client";
import React, { useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";
export default function CustomTextTransition({ words }: { words: string[] }) {
  const [index, setIndex] = React.useState(0);
  const TEXTS = words;
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <TextTransition springConfig={presets.wobbly}>
      {TEXTS[index % TEXTS.length]}
    </TextTransition>
  );
}
