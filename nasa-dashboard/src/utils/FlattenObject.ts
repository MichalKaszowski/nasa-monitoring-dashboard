export const flattenObject = (ob: { [x: string]: any }) => {
  let result: { [x: string]: any } = {};

  for (const i in ob) {
    if (
      typeof ob[i] === "object"
      // && !Array.isArray(ob[i])
    ) {
      const temp = flattenObject(ob[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + "_" + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  // console.log("result b4 return: ", result);
  return result;
};
