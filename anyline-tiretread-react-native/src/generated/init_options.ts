export interface InitOptions {
    customTag?: null | string;
    /**
     * Maximum time in milliseconds allowed per attempt when uploading a single
     * captured image. Each image is tried up to 2 times (1 retry) internally.
     * Raise for poor-connectivity fleets, lower to fail fast. Default: 20000.
     */
    uploadTimeoutMillis?: null | number;
}
