function readErrorMessage(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) {
    return undefined
  }

  if ("error" in value) {
    const nestedMessage = readErrorMessage(value.error)

    if (nestedMessage) {
      return nestedMessage
    }
  }

  if ("message" in value && typeof value.message === "string") {
    return value.message
  }

  return undefined
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return readErrorMessage(error) ?? fallback
}
