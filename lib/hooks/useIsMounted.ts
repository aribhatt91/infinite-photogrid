// hooks/useIsMounted.ts
import { useSyncExternalStore } from 'react';

// 1. Subscribe: We don't actually need to listen to changes 
// for a simple mount check, so we return a no-op function.
const subscribe = () => () => {};

// 2. Client Snapshot: Once on the client, this always returns true.
const getSnapshot = () => true;

// 3. Server Snapshot: On the server, this always returns false.
const getServerSnapshot = () => false;

export function useIsMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}