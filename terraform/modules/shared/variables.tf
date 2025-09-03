variable "role_name" {
  description = "Name of the IAM role"
  type        = string
  default     = "lambda_execution_role"
}

variable "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table to grant access to"
  type        = string
}
