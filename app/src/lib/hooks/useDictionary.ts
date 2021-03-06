import { useContext } from "react";
import { DictionaryContext } from "../providers/DictionaryProvider";

export const useDictionary = () => useContext(DictionaryContext);
