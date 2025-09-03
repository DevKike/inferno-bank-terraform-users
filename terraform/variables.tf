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

variable "aws_secret_access_key" {
  description = "AWS secret key"
  sensitive   = true
}

variable "jwt_secret_key" {
  description = "JWT Secret Key"
  sensitive   = true
}
