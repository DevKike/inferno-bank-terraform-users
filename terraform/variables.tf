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
