const parseScalar = (value) => {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (/^(true|false)$/i.test(trimmed)) {
    return trimmed.toLowerCase() === "true";
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed;
};

export const parseSimpleYaml = (yamlText) => {
  const result = {};
  const stack = [{ indent: -1, obj: result }];
  const lines = (yamlText || "").split(/\r?\n/);

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;
    if (rawLine.trimStart().startsWith("#")) continue;

    const indent = rawLine.match(/^ */)?.[0]?.length ?? 0;
    const trimmedLine = rawLine.trim();
    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex === -1) continue;

    const key = trimmedLine.slice(0, colonIndex).trim();
    const rawValue = trimmedLine.slice(colonIndex + 1);

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parentObj = stack[stack.length - 1].obj;

    if (!rawValue.trim()) {
      parentObj[key] = {};
      stack.push({ indent, obj: parentObj[key] });
      continue;
    }

    parentObj[key] = parseScalar(rawValue);
  }

  return result;
};

export const deepMerge = (base, override) => {
  const output = { ...base };
  const overrideObj = override || {};

  Object.keys(overrideObj).forEach((key) => {
    const baseValue = output[key];
    const overrideValue = overrideObj[key];

    const bothObjects =
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      overrideValue &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue);

    output[key] = bothObjects
      ? deepMerge(baseValue, overrideValue)
      : overrideValue;
  });

  return output;
};
