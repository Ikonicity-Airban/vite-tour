import React from "react";
import useDisplayMessage from "../api/useDisplayMessage";
import useNavigatorOnLine from "../api/useNavigator";

const NetworkStatusIndicator = () => {
  const { show, close } = useDisplayMessage();
  const isOnline = useNavigatorOnLine();
  const firstUpdate = React.useRef(true);

  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    isOnline ? show("You are back online!") : show("You are currently offline");
  }, [close, show, isOnline]);

  return null;
};

export default NetworkStatusIndicator;
