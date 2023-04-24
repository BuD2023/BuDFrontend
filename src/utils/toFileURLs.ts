export const toFileURLs = async (fileList: File[]) =>
  await Promise.all(
    fileList
      .map((compressed) => {
        return new Promise<string>((resolve) => {
          let reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(compressed as Blob);
        });
      })
      .flat()
  );
