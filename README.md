# Inferno Bank Users Service - Terraform (AWS)

This README provides comprehensive documentation for the Inferno Bank Users Service project with Terraform using Amazon Web Services as provider, which implements a serverless user authentication system with sign-up and sign-in functionality.

## 📋 Project Overview

This project implements a serverless user management service using Terraform, implementing: API Gateway, AWS Lambda, DynamoDB, S3, and Secrets Manager, following hexagonal architecture principles. The system provides:

- User registration with password encryption
- User authentication with JWT tokens
- Protected routes to access user information via JWT tokens
- Ability to upload avatars to S3

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ API Gateway │ ──>  │   Lambda    │  ──> │   DynamoDB   │
└─────────────┘      └─────────────┘      └──────────────┘
        │                   │
        │                   │
        │                   ▼
        │             ┌─────────────┐
        │             │     S3      │
        │             └─────────────┘
        │                   │
        │                   ▼
        │             ┌─────────────┐
        │             │Secrets Mngr.│
        │             └─────────────┘
```

### Components

- **API Gateway**: HTTP API with routes for user operations
- **Lambda Functions**: register, login, jwt-authorizer, get-profile, update, upload-avatar
- **DynamoDB**: NoSQL database with GSIs for email, phone, and document lookups
- **S3**: Cloud object storage for user avatars
- **Secrets Manager**: Secure storage for sensitive data (e.g., password encryption keys)
- **JWT**: Stateless authentication for protected routes

## 🔧 Prerequisites

- Node.js (v18+)
- Terraform (v1.10+)
- AWS Account with appropriate permissions

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DevKike/inferno-bank-terraform-users.git
cd inferno-bank-terraform-users
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create Terraform variables file

Create terraform.tfvars based on the example file:

```hcl
aws_access_key = "YOUR_AWS_ACCESS_KEY"
aws_secret_access_key = "YOUR_AWS_SECRET_KEY"
aws_region = "us-west-1"

secrets_manager_key_value = "YOUR_SECRET_KEY"

base_cidr_block = "10.0.0.0/16"

jwt_secret_key = "your-secret-key-change-in-production"
jwt_token_expiration = 3600

bucket_name = "YOUR_UNIQUE_BUCKET_NAME"
bucket_enable_versioning = true
bucket_cors_allowed_origins = ["*"]
bucket_signed_url_expiration = 3600
```

## 📁 Project Structure

```
├── src/
│   ├── application/             # Application use cases
│   │   └── use-cases/
│   │       ├── get-profile/
│   │       │   └── users-get-profile.use-case.ts
│   │       ├── login/
│   │       │   └── users-login.use-case.ts
│   │       ├── register/
│   │       │   └── users-register.use-case.ts
│   │       ├── update/
│   │       │   └── users-update.use-case.ts
│   │       └── upload-avatar/
│   │           └── users-upload-avatar.use-case.ts
│   │
│   ├── domain/                  # Domain entities and interfaces
│   │   ├── entity/
│   │   ├── enums/
│   │   ├── exceptions/
│   │   ├── providers/
│   │   ├── repository/
│   │   ├── schema/
│   │   ├── service
│   │   ├── use-case/
│   │   └── utils/
│   │
│   └── infrastructure/          # Implementation details
│       ├── environments/        # Environment configurations
│       ├── handlers/            # Lambda function handlers
│       │   ├── get-profile/     # Get authenticated user info
│       │   ├── jwt-authorizer/  # JWT validation for protected routes
│       │   ├── login/           # User authentication
│       │   ├── register/        # User registration
│       │   ├── update/          # User update data
│       │   └── upload-avatar/   # User upload avatar image
│       ├── middlewares/         # Middlewares implementations
│       ├── providers/           # Providers implementations
│       ├── repository/          # Repository implementations
│       ├── schemas/             # Schemas implementations
│       ├── service/             # Service implementations
│       └── utils/               # Utility functions
│
├── terraform/                   # Infrastructure as Code
│   ├── modules/                 # Terraform modules
│   │   ├── api-gateway/
│   │   ├── dynamo-db/
│   │   ├── lambda/
│   │   ├── s3/
│   │   ├── secrets-manager/
│   │   └── shared/              # IAM roles and policies
│   │
│   ├── api-gateway-authorizer.tf
│   ├── api-gateway.tf
│   ├── dynamo-db.tf
│   ├── lambda.tf
│   ├── provider.tf
│   ├── s3.tf
│   ├── secrets-manager.tf
│   ├── terraform.tfvars.example # Use it for set environments
│   └── variables.tf
│
└── build.js                     # Lambda build script
```

## 📦 Lambda Functions

The project includes four Lambda functions:

1. **register**: Registers new users with encrypted passwords
2. **login**: Authenticates users and generates JWT tokens
3. **jwt-authorizer**: Validates JWT tokens for protected routes
4. **user-info**: Retrieves user information using the authorized user's ID from the JWT token
5. **update**: Updates user profile information
6. **upload-avatar**: Uploads and stores a profile picture associated with the user

## 🗄️ Database Schema

**DynamoDB Table: users**

- `uuid` (Partition Key): String
- `name`: String
- `lastName`: String
- `email`: String (with GSI for lookups)
- `password`: String (bcrypt hashed, using secret as key)
- `document`: String (with GSI for lookups)
- `address`: String
- `phone`: String (with GSI for lookups)
- `image`: String

## 🚢 Deployment

### Build and Deploy

```bash
# Build Lambda functions and deploy infrastructure
npm run deploy

# Individual steps
npm run build:lambdas  # Build Lambda functions
cd terraform && terraform apply  # Deploy infrastructure
```

### Terraform Commands

```bash
# Initialize Terraform
cd terraform
terraform init

# Plan deployment
terraform plan

# Apply changes
terraform apply

# Destroy resources
terraform destroy
```

## 🔌 API Endpoints

### Register

```
POST /users/register
```

**Request Body:**

```json
{
  "name": "Carlos",
  "lastName": "Ramírez",
  "email": "carlos.ramirez@example.com",
  "password": "SecurePass123",
  "document": "9876543210"
}
```

**Response:**

```json
{
  "message": "User registered with success!"
}
```

### Login

```
POST /users/login
```

**Request Body:**

```json
{
{
  "email": "carlos.ramirez@example.com",
  "password": "SecurePass123"
}
}
```

**Response:**

```json
{
  "message": "User logged in with success!",
  "data": {
    "user": {
      "name": "Carlos",
      "lastName": "Ramírez"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get User Information

```
GET /users/profile
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "message": "User data retrieved successfully!",
  "data": {
    "image": "https://example-bucket.s3.amazonaws.com/avatars/carlos.jpg",
    "lastName": "Ramírez",
    "address": "Calle 45 #123, Bogotá",
    "email": "carlos.ramirez@example.com",
    "document": "9876543210",
    "name": "Carlos",
    "phone": "3109876543"
  }
}
```

### Update User Information

```
PUT /users/profile
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "address": "Av. Siempre Viva 742",
  "phone": "3204567890"
}
```

**Response:**

```json
{
  "message": "User updated with success!",
  "data": {
    "image": "https://example-bucket.s3.amazonaws.com/avatars/carlos.jpg",
    "lastName": "Ramírez",
    "address": "Av. Siempre Viva 742",
    "email": "carlos.ramirez@example.com",
    "document": "9876543210",
    "name": "Carlos",
    "phone": "3204567890"
  }
}
```

### Upload avatar

```
POST /users/profile/avatar
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request (form-data):**

```yaml
Key: avatar   |   Value: <file>
```

**Response:**

```json
{
  "message": "Avatar uploaded with success!",
  "data": {
    "url": "https://example-bucket.s3.amazonaws.com/avatars/carlos.jpg"
  }
}
```

## 🛠️ Technologies Used

- **Node.js** (runtime - v24.7.0)
- **TypeScript**
- **AWS Lambda**
- **AWS API Gateway (HTTP API)**
- **Amazon DynamoDB**
- **Amazon S3**
- **AWS Secrets Manager**
- **Terraform** (cloud infrastructure - v1.13.1)
- **esbuild** (bundler)
- **adm-zip** (zip packaging)
- **jsonwebtoken** (JWT auth)
- **bcryptjs** (password hashing)
- **uuid** (unique IDs)
- **Middy** (Lambda middleware framework)
- **@middy/http-json-body-parser** (JSON body parsing)
- **@middy/http-multipart-body-parser** (multipart/form-data support)
- **@middy/http-error-handler** (error handling)
- **JSON Schema** (request validation)

---

🚀 Happy coding! 🚀
