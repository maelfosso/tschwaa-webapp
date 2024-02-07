import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export default function WithFlowbite({ children }: { children: JSX.Element}) {
  useEffect(() => initFlowbite(), []);

  return <>{ children }</>
}