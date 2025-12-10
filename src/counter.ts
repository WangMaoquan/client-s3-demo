import {
  createBucket,
  listBuckets,
  upload,
  deleteBucket,
  listObjectsInBucket,
} from './s3-client';

export function setupCounter(element: HTMLButtonElement) {
  Promise.resolve()
    // .then(() => createBucket({ Bucket: 'test1' }))
    .then(() => listBuckets())
    // .then(() => deleteBucket({ Bucket: 'test1' }))
    .then(() => listObjectsInBucket({ Bucket: 'test1' }));
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
