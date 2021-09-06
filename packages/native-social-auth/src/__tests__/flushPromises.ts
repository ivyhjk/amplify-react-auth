export default function flushPromises (): Promise<ReturnType<typeof setImmediate>> {
  return new Promise((resolve) => setImmediate(resolve));
}
