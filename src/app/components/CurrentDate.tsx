"use client";

const CurrentDate = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return <span className="text-xs text-neutral-500">{date}</span>;
};

export default CurrentDate;
