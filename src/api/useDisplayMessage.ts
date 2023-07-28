import { toast } from "react-hot-toast";

function useDisplayMessage() {
  function show(msg: string) {
    toast.success(msg);
  }
  function close() {
    toast.dismiss();
  }
  return { show, close };
}

export default useDisplayMessage;
