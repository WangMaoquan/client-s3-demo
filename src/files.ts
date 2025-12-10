import { preview, upload } from './s3-client';
export const SetupFiles = (target: HTMLInputElement) => {
  // console.dir(target);
  target.onchange = async () => {
    console.log(target.files);
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const Body = await fileToUint8Array(file);

      upload({ Bucket: 'test1', Key: file.name, Body }).then((res) => {
        console.log(res, 'upload');
        preview({ Bucket: 'test1', Key: file.name }).then((res) =>
          console.log(res, 'img-path'),
        );
      });
    }
  };
};

function fileToUint8Array(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer) {
        resolve(new Uint8Array(arrayBuffer as ArrayBuffer));
      } else {
        reject(new Error('Failed to convert file to Uint8Array.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading the file.'));
    };

    reader.readAsArrayBuffer(file);
  });
}
