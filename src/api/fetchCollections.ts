import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Types, defaultPlace } from "./reducer";
import { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "./context";
import { IPlaceResponse } from "./@types";
import { db } from "../firebase";
import useLocalStorage from "./useLocalStorage";

//
function useFetchSites() {
  const [places, setPlaces] = useLocalStorage<IPlaceResponse[]>(
    "tour-places",
    defaultPlace
  );
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: Types.setIsLoading, payload: true });
      try {
        const querySnapshot = await getDocs(collection(db, "places"));
        const newArray: IPlaceResponse[] = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          newArray.push(doc.data());
        });
        dispatch({ type: Types.setPlaces, payload: newArray });
        setPlaces(newArray);
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        dispatch({ type: Types.setIsLoading, payload: false });
      }
    };
    fetchData();
  }, []);

  return places;
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
        const dataWithIds: T[] & { id: string }[] = [];
        querySnapshot.forEach((doc) => {
          dataWithIds.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCol(dataWithIds);
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

export async function SaveToFirestore<T extends WithFieldValue<DocumentData>>(
  colName: string,
  data: T
) {
  const userRef = collection(db, colName);
  return await addDoc(userRef, data);
}

export default useFetchSites;
