import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Types, defaultPlace } from "../contexts/reducer";
import { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "../contexts/context";
import { IPlaceResponse } from "../@types";
import { db } from "../../firebase";
import useLocalStorage from "../hooks/useLocalStorage";

//
function useFetchSites() {
  const [places, setPlaces] = useLocalStorage<IPlaceResponse[]>(
    "tour-places",
    defaultPlace
  );
  const { dispatch } = useContext(AppContext);

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
  useEffect(() => {
    fetchData();
  }, []);

  return places;
}

export function useFetchCollection<T>(colName: string) {
  const { dispatch } = useContext(AppContext);
  const [col, setCol] = useState<T[] | DocumentData>([]);
  const [fetching, setFetching] = useState(false);

  const fetchData = useCallback(async () => {
    dispatch({ type: Types.setIsLoading, payload: true });
    setFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, colName));
      const newArray: T[] | DocumentData = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        newArray.push({ ...doc.data(), id: doc.id });
      });

      setCol(newArray);
    } catch (e) {
      console.error("Error fe document: ", e);
    } finally {
      dispatch({ type: Types.setIsLoading, payload: false });
      setFetching(false);
    }
  }, [colName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    setFetching(true);
    fetchData();
  };

  return { data: col, refetch, fetching };
}

export function useFetchSingleDoc<T>(colName: string, docId: string) {
  const { dispatch } = useContext(AppContext);
  const [document, setDocument] = useState<T | DocumentData>({});
  const [fetching, setFetching] = useState(false);

  const fetchData = useCallback(async () => {
    dispatch({ type: Types.setIsLoading, payload: true });
    setFetching(true);
    try {
      const newDoc = await getDoc(doc(db, colName, docId));

      setDocument({ ...newDoc.data() });
    } catch (e) {
      console.error("Error fetching document: ", e);
    } finally {
      dispatch({ type: Types.setIsLoading, payload: false });
      setFetching(false);
    }
  }, [docId, colName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    setFetching(true);
    fetchData();
  };

  return { data: document, refetch, fetching };
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
