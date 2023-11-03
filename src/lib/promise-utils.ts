export async function runAndRetry<T>({
  func,
  onFail,
  shouldRetry,
  waitOnErrorInterval = 4000,
}: {
  func: () => Promise<T>
  onFail?: (e: Error) => void
  shouldRetry: () => boolean
  waitOnErrorInterval?: number
}): Promise<T> {
  let lastErr: Error
  do {
    try {
      const result = await func()
      // it worked
      return result
    } catch (err) {
      lastErr = err as Error
      if (typeof onFail === 'function') {
        onFail(err as Error)
      }
      await new Promise((res) => setTimeout(res, waitOnErrorInterval))
    }
  } while (shouldRetry())

  // all the iterations failed
  throw lastErr
}

/**
 * @param func The promise-returning function to invoke
 * @param timeout Timeout (in milliseconds) to wait before failing
 * @param timeoutMessage (optional) Message to use when throwing a timeout error
 */
export function promiseFuncWithTimeout<T>(
  func: () => Promise<T>,
  timeout: number,
  timeoutMessage?: string
): Promise<T> {
  if (typeof func !== 'function') throw new Error('Invalid function')
  else if (isNaN(timeout) || timeout < 0) throw new Error('Invalid timeout')

  return new Promise((resolve, reject) => {
    setTimeout(
      () => reject(new Error(timeoutMessage || 'The request timed out')),
      timeout
    )

    return func()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

/**
 * @param prom The promise to track
 * @param timeout Timeout (in milliseconds) to wait before failing
 * @param timeoutMessage (optional) Message to use when throwing a timeout error. By default: `"The request timed out"`
 */
export function promiseWithTimeout<T>(
  prom: Promise<T>,
  timeout: number,
  timeoutMessage?: string
): Promise<T> {
  if (
    !prom ||
    typeof prom.then !== 'function' ||
    typeof prom.catch !== 'function'
  ) {
    throw new Error('Invalid promise')
  } else if (isNaN(timeout) || timeout < 0) throw new Error('Invalid timeout')

  return new Promise((resolve, reject) => {
    setTimeout(
      () => reject(new Error(timeoutMessage || 'The request timed out')),
      timeout
    )

    return prom.then((result) => resolve(result)).catch((err) => reject(err))
  })
}
