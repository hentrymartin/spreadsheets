// This will return the difference in milli seconds
export const diffInMilliSeconds = (now: Date, then: Date) => {
  return (then.getTime() - now.getTime());
};
