variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region to deploy resources"
}

variable "base_cidr_block" {
  description = "CIDR block for the VPC"
}

variable "aws_access_key" {
  description = "AWS access key"
  sensitive   = true
}

variable "secrets_manager_key_value" {
  description = "value"
  sensitive   = true
}

variable "aws_secret_access_key" {
  description = "AWS secret key"
  sensitive   = true
}

variable "jwt_secret_key" {
  description = "Secret key for JWT token signin"
  sensitive   = true
}

variable "jwt_token_expiration" {
  description = "JWT token expiration time in seconds"
  type        = number
  sensitive   = true
}

variable "bucket_name" {
  description = "Name of the S3 bucket for user files"
  type        = string
  sensitive   = true
}

variable "bucket_enable_versioning" {
  description = "Enable versioning for the S3 bucket"
  type        = bool
  default     = true
}

variable "bucket_cors_allowed_origins" {
  description = "List of allowed origins for CORS"
  type        = list(string)
  default     = ["*"]
}

variable "bucket_signed_url_expiration" {
  description = "Expiration time in seconds for S3 signed URLs"
  type        = number
  default     = 3600
}
