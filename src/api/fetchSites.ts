import { useEffect, useContext, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AppContext } from "./context";
import { Types } from "./reducer";
import { IPlaceResponse } from "./@types";

//
function useFetchSites() {
  const { dispatch } = useContext(AppContext);

  const fetchData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "places"));
      const newArray: IPlaceResponse[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        newArray.push(doc.data());
      });

      dispatch({
        type: Types.setPlaces,
        payload: newArray,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
}

export default useFetchSites;
