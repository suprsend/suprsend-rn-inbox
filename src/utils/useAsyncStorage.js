import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAsyncStorage(key, defaultValue) {
  const [storageValue, updateStorageValue] = useState(defaultValue);

  useEffect(() => {
    getStorageValue();
  }, [defaultValue.distinct_id]);

  async function getStorageValue() {
    let value = defaultValue;
    try {
      value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
      value =
        value.distinct_id === defaultValue.distinct_id ? value : defaultValue;
    } catch (e) {
    } finally {
      updateStorageValue(value);
    }
  }

  async function updateStorage(newValue) {
    try {
      if (newValue === null) {
        await AsyncStorage.removeItem(key);
      } else {
        newValue.distinct_id = defaultValue.distinct_id;
        const value = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
    } finally {
      getStorageValue();
    }
  }

  return [storageValue, updateStorage];
}
