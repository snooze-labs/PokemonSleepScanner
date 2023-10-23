import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecipeType } from '../gameData/recipes/types';

/**
 * Data to be stored in persistent storage.
 */
export enum PersistedData {
  PotSize = 'PotSize',
  RecipeType = 'RecipeType',
}

/**
 * JSON-serializable data types for each key.
 */
export type PersistedDataPayload = {
  [T in PersistedData]: {
    [PersistedData.PotSize]: number;
    [PersistedData.RecipeType]: RecipeType | null;
  }[T];
};

/**
 * Stores data to persistent storage.
 */
export async function storeData<T extends PersistedData>(
  key: T,
  value: PersistedDataPayload[T],
) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Failed to store key: ${key}`, e);
  }
}

/**
 * Retrieves data from persistent storage.
 */
export async function getData<T extends PersistedData>(
  key: T,
): Promise<PersistedDataPayload[T] | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Failed to get from key: ${key}`, e);
  }
}
