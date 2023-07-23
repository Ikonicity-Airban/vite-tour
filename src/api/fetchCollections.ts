import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "./context";
import { IPlaceResponse } from "./@types";
import { Types } from "./reducer";
import { db } from "../firebase";

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
export function useQueryCollection<T>(
  colName: string,
  queryStr: string,
  to: string
) {
  const [col, setCol] = useState<T[] | DocumentData>([]);
  const { dispatch } = useContext(AppContext);

  const fetchData = useCallback(async () => {
    dispatch({ type: Types.setIsLoading, payload: true });

    try {
      const q = query(collection(db, colName), where(queryStr, "==", to));
      const fetchCollection = async () => {
        const querySnapshot = await getDocs(q);
        setCol(querySnapshot.docs.map((doc) => doc.data()));
      };
      fetchCollection();
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      dispatch({ type: Types.setIsLoading, payload: false });
    }
  }, [dispatch, colName, queryStr, to]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return col;
}

export default useFetchSites;
