export function getBlogDate(createdAt: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return createdAt.toLocaleDateString("en-US", options);
}
