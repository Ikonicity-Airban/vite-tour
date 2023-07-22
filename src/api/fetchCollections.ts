import { useEffect, useContext, useState, useCallback } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AppContext } from "./context";
import { Types } from "./reducer";
import { IPlaceResponse } from "./@types";

//
function useFetchSites() {
  const { dispatch } = useContext(AppContext);

  const fetchData = useCallback(async () => {
    dispatch({ type: Types.setIsLoading, payload: true });
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
    } finally {
      dispatch({ type: Types.setIsLoading, payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
}

export function useFetchCollection<T>(colName: string) {
  const [col, setCol] = useState<T[] | DocumentData>([]);
  const { dispatch } = useContext(AppContext);

  const fetchData = useCallback(async () => {
    dispatch({ type: Types.setIsLoading, payload: true });

    try {
      const querySnapshot = await getDocs(collection(db, colName));
      const newArray: T[] | DocumentData = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        newArray.push(doc.data());
      });

      setCol(newArray);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      dispatch({ type: Types.setIsLoading, payload: false });
    }
  }, [dispatch, colName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return col;
}

export default useFetchSites;
