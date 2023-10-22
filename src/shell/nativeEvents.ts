/** ID for the native event channel. */
export const NativeEventChannelID = 'POKEMON_SLEEP_SCANNER_NATIVE_EVENT';

/**
 * Native events.
 */
export enum NativeEvents {
  ScanCompleted = 'SCAN_COMPLETED',
}

/**
 * Payload for the event.
 */
export type INativeEventPayload = {
  [T in NativeEvents]: {
    [NativeEvents.ScanCompleted]: {
      filePath: string;
    };
  }[T];
};

/**
 * Handler for native events.
 */
export type INativeEventHandlerMap = {
  [Tkey in NativeEvents]: (
    payload: INativeEventPayload[Tkey],
  ) => Promise<void> | void;
};
