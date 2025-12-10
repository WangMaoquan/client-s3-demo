import {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  type CreateBucketCommandInput,
  BucketAlreadyOwnedByYou,
  DeleteBucketCommand,
  type DeleteBucketCommandInput,
  ListObjectsV2Command,
  type ListObjectsV2CommandInput,
  PutObjectCommand,
  type PutObjectCommandInput,
  type GetObjectCommandInput,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
  region: 'cn-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_RUSTFS_ACCESS_KEY_ID!,
    secretAccessKey: import.meta.env.VITE_RUSTFS_SECRET_ACCESS_KEY!,
  },
  endpoint: import.meta.env.VITE_RUSTFS_ENDPOINT_URL,
});

console.log(client);

/**
 * 创建桶
 */

export const createBucket = async ({ Bucket }: CreateBucketCommandInput) => {
  try {
    const response = await client.send(
      new CreateBucketCommand({
        Bucket,
        ACL: 'public-read',
      }),
    );
    console.log(response, 'createBucket');
  } catch (error) {
    if (error instanceof BucketAlreadyOwnedByYou) {
      console.log(error.message);
    }
  }
};

/**
 * 获取 所有的 桶
 */
export const listBuckets = async () => {
  try {
    const response = await client.send(new ListBucketsCommand({}));
    console.log(response, 'ListBucketsCommand');
  } catch (error) {
    console.log(error);
  }
};

/**
 * 删除桶
 */

export const deleteBucket = async ({ Bucket }: DeleteBucketCommandInput) => {
  try {
    const response = await client.send(
      new DeleteBucketCommand({
        Bucket,
      }),
    );
    console.log(response, 'DeleteBucketCommand');
  } catch (error) {
    console.log(error);
  }
};

/**
 * 列出桶里面的对象
 */

export const listObjectsInBucket = async ({
  Bucket,
}: ListObjectsV2CommandInput) => {
  try {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket,
      }),
    );
    console.log(response, 'ListObjectsV2Command');
  } catch (error) {
    console.log(error);
  }
};

/**
 * 上传文件
 */
export const upload = async ({ Bucket, Key, Body }: PutObjectCommandInput) => {
  try {
    const response = await client.send(
      new PutObjectCommand({
        Bucket,
        Key,
        Body,
      }),
    );
    console.log(response, 'PutObjectCommand');
  } catch (error) {
    console.log(error);
  }
};

/**
 * 预览
 */

export const preview = async (
  { Bucket, Key }: GetObjectCommandInput,
  expiresIn = 60 * 60 * 24 * 7,
) => {
  const commad = new GetObjectCommand({
    Bucket,
    Key,
  });

  return getSignedUrl(client, commad, { expiresIn });
};
