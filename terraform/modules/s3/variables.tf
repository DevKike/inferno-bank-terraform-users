variable "files_bucket_name" {
  description = "Name of the S3 bucket for user files"
  type        = string
  default     = "inferno-bank-users-bucket"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "enable_versioning" {
  description = "Enable versioning for the S3 bucket"
  type        = bool
  default     = true
}

variable "cors_allowed_origins" {
  description = "List of allowed origins for CORS"
  type        = list(string)
  default     = ["*"]
}
