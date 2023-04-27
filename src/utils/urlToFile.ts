//url을 blob으로 변환
export function urlToFile(url: string): Promise<FileList> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response as Blob;
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        const file = new File([blob], fileName, { type: blob.type });
        const fileList = new FileList();
        fileList[0] = file;
        resolve(fileList);
      } else {
        reject(new Error('Failed to load URL as FileList'));
      }
    };
    xhr.onerror = () => {
      reject(new Error('Failed to load URL as FileList'));
    };
    xhr.send();
  });
}
