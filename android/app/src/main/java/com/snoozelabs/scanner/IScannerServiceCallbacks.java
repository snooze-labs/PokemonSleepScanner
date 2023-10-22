package com.snoozelabs.scanner;

/**
 * Callbacks for scanner service.
 */
public interface IScannerServiceCallbacks {
    void onScanComplete(String filePath);
    void onDisposeService();
}
