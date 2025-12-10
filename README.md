# Client S3 Demo

这是一个简单的 AWS S3 客户端演示项目，展示如何连接 S3 并执行基本操作。

## 环境配置

在 `.env` 文件中配置以下环境变量：

```env
VITE_RUSTFS_ACCESS_KEY_ID=your-access-key-id
VITE_RUSTFS_SECRET_ACCESS_KEY=your-secret-access-key
VITE_RUSTFS_ENDPOINT_URL=your-s3-endpoint-url
```

## S3 连接配置

```typescript
import { S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'cn-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_RUSTFS_ACCESS_KEY_ID!,
    secretAccessKey: import.meta.env.VITE_RUSTFS_SECRET_ACCESS_KEY!,
  },
  endpoint: import.meta.env.VITE_RUSTFS_ENDPOINT_URL,
});
```

## S3 操作

### 桶操作

```typescript
import { createBucket, listBuckets, deleteBucket } from './src/s3-client';

// 创建桶
await createBucket({ Bucket: 'test-bucket' });

// 列出所有桶
await listBuckets();

// 删除桶
await deleteBucket({ Bucket: 'test-bucket' });
```

### 文件操作

```typescript
import { upload, preview, listObjectsInBucket } from './src/s3-client';

// 上传文件
await upload({
  Bucket: 'test-bucket',
  Key: 'file-name.jpg',
  Body: fileContent,
});

// 生成预览 URL
const signedUrl = await preview({
  Bucket: 'test-bucket',
  Key: 'file-name.jpg',
});

// 列出桶内对象
await listObjectsInBucket({ Bucket: 'test-bucket' });
```

## 文件上传示例

```typescript
import { SetupFiles } from './src/files';

// 设置文件上传
SetupFiles(document.querySelector('input[type="file"]')!);
```

## 运行

```bash
pnpm install
pnpm dev
```

## 依赖

- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner`
