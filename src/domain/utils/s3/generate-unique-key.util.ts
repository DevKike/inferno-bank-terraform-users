export const generateUniqueKey = (path: string, fileName: string): string => {
  return `${path}/${Date.now}_${fileName}`;
};
