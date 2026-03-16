# Hotel Management App — AWS Bootcamp

A full-stack hotel management application with a React frontend hosted on S3/CloudFront and a Node.js/Express backend running on EC2 with PostgreSQL on RDS.

---

## Repository Structure

```
aws-bootcamp/
├── frontend/        # React app (Create React App)
├── backend/         # Node.js + Express + TypeScript API
├── .github/
│   └── workflows/
│       └── pipeline.yml   # GitHub Actions CI/CD pipeline
└── README.md
```

---

## Architecture

```
User → CloudFront (HTTPS) → S3 (React build)
                          ↓
                    EC2 (Node.js API)
                          ↓
                    RDS (PostgreSQL)
```

---

## Prerequisites

### AWS Resources
| Resource | Purpose |
|---|---|
| S3 Bucket | Host React frontend static files |
| CloudFront | HTTPS CDN in front of S3 and EC2 |
| EC2 (Amazon Linux 2) | Run Node.js backend |
| RDS (PostgreSQL) | Database |
| IAM OIDC Role | Allow GitHub Actions to authenticate with AWS |
| SSM Agent on EC2 | Allow pipeline to run commands on EC2 without SSH |

### EC2 Setup (one-time)

SSH into EC2 and run:

```bash
# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install PM2
sudo npm install -g pm2
pm2 startup

# Install PostgreSQL client (optional)
sudo yum install -y postgresql15
```

Attach an IAM instance profile to EC2 with these policies:
- `AmazonSSMManagedInstanceCore`
- `AmazonS3ReadOnlyAccess`

---

## CI/CD Pipeline

The pipeline is defined in [.github/workflows/pipeline.yml](.github/workflows/pipeline.yml) and triggers on every push to `master`.

### Flow

```
Push to master
      │
      ▼
┌─────────────────────┐
│  Deploy Frontend    │
│  1. npm ci + build  │
│  2. aws s3 sync     │
└────────┬────────────┘
         │ (on success)
         ▼
┌─────────────────────────────────────────┐
│  Deploy Backend                         │
│  1. npm ci + tsc build                  │
│  2. zip dist/ + upload to S3            │
│  3. write .env + upload to S3           │
│  4. SSM send-command to EC2:            │
│     - download zip from S3              │
│     - extract files                     │
│     - npm install                       │
│     - pm2 restart                       │
└─────────────────────────────────────────┘
```

### AWS Authentication (OIDC)

No AWS access keys are stored in GitHub. The pipeline uses **OpenID Connect (OIDC)** to assume an IAM role directly.

**IAM Role trust policy:**
```json
{
  "Effect": "Allow",
  "Principal": {
    "Federated": "arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com"
  },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringLike": {
      "token.actions.githubusercontent.com:sub": "repo:<owner>/<repo>:*"
    }
  }
}
```

**IAM Role permissions needed:**
- `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`, `s3:ListBucket` on the S3 bucket
- `ssm:SendCommand`, `ssm:GetCommandInvocation` on the EC2 instance

### Why S3 for backend deployment?

SSM `send-command` can only execute shell commands on EC2 — it cannot transfer files. So the pipeline:
1. Uploads the build artifact to S3
2. EC2 pulls it down via `aws s3 cp` inside the SSM command

### GitHub Secrets / Variables

Set these in **GitHub → Settings → Secrets and variables → Actions**:

| Name | Description |
|---|---|
| `AWS_OIDC_ROLE_ARN` | IAM role ARN for OIDC auth |
| `AWS_REGION` | AWS region (e.g. `us-east-1`) |
| `S3_BUCKET_NAME` | Frontend S3 bucket name |
| `EC2_INSTANCE_ID` | EC2 instance ID (e.g. `i-0abc1234`) |
| `REACT_APP_API_URL` | Backend HTTPS URL (CloudFront or ALB) |
| `RDS_ENDPOINT` | RDS PostgreSQL host endpoint |
| `DB_NAME` | Database name |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |

---

## Running Locally

### Backend
```bash
cd backend
cp .env.example .env   # fill in your DB details
npm install
npm run build
npm start
```

### Frontend
```bash
cd frontend
REACT_APP_API_URL=http://localhost:3000 npm start
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/hotels` | Get all hotels |
| POST | `/api/hotels` | Add a hotel |
| GET | `/api/rooms` | Get all rooms |
| GET | `/api/bookings` | Get all bookings |
| POST | `/api/bookings` | Create a booking |
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a user |

---

## Database Commands

```bash
# Connect to RDS from EC2
psql -h <rds-endpoint> -U postgres -d postgres

# Clear all data
psql -h <rds-endpoint> -U postgres -d postgres \
  -c "DELETE FROM bookings; DELETE FROM rooms; DELETE FROM hotels;"
```
