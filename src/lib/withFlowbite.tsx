import { initFlowbite } from "flowbite";
import { FC, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withFlowbite = (WrappedComponent: FC) => (props: any) => {

  useEffect(() => initFlowbite(), []);

  return <WrappedComponent {...props} />;
}

export default withFlowbite;
