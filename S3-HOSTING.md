# S3 Static Website Hosting Setup

## 1. Create S3 Bucket

1. Go to **S3 → Create bucket**
2. Enter a bucket name (e.g. `&lt;your-bucket-name&gt;`)
3. Select region (e.g. `us-east-1`)
4. Uncheck **Block all public access**
5. Acknowledge the warning
6. Click **Create bucket**

---

## 2. Enable Static Website Hosting

1. Go to the bucket → **Properties**
2. Scroll to **Static website hosting** → Click **Edit**
3. Select **Enable**
4. Set **Index document** → `index.html`
5. Set **Error document** → `index.html` (required for React Router)
6. Click **Save changes**

Your website endpoint will be:
```
http://<bucket-name>.s3-website-<region>.amazonaws.com
```

---

## 3. Disable Block Public Access

1. Go to bucket → **Permissions**
2. Click **Block public access** → **Edit**
3. Uncheck all 4 options
4. Click **Save changes** → confirm

---

## 4. Add Bucket Policy

1. Go to bucket → **Permissions** → **Bucket policy** → **Edit**
2. Paste the following:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<your_bucket_name>/*"
    }
  ]
}
```

3. Click **Save changes**

---

## 5. Upload Files

### Option A — AWS Console (Manual)

1. Go to your bucket → **Objects** → click **Upload**
2. Click **Add files** → select `index.html`
3. Click **Upload**

> To upload an entire build folder, click **Add folder** and select the `index.html` file.
```

---

## 6. Test

Open the website endpoint in your browser:
```
http://&lt;your-bucket-name&gt;.s3-website-us-east-1.amazonaws.com
```
