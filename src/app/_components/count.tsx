"use client";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { increment } from "../../../store/slices/couterSlice";

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  console.log("🚀 ~ count:", count);
  const dispatch = useAppDispatch();
  const handleIncrease = () => {
    dispatch(increment());
  };
  return (
    <div>
      <p>News Page</p>
      <button onClick={handleIncrease}>+</button>
      <p>{count}</p>
    </div>
  );
}
