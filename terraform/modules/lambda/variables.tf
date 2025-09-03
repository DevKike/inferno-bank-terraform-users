variable "function_name" {
  description = "Name of the Lambda function"
  type        = string
}

variable "lambda_role_arn" {
  description = "ARN of the IAM role for Lambda"
  type        = string
}

variable "handler" {
  description = "Handler for Lambda function"
  type        = string
  default     = "index.handler"
}

variable "runtime" {
  description = "Runtime for Lambda"
  type        = string
  default     = "nodejs18.x"
}

variable "zip_file" {
  description = "Path to the zip file"
  type        = string
}

variable "source_code_hash" {
  description = "Source code hash for Lambda"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables for Lambda"
  type        = map(string)
  default     = {}
}

variable "api_gateway_id" {
  description = "ID of the API Gateway"
  type        = string
}

variable "api_gateway_execution_arn" {
  description = "Execution ARN of API Gateway"
  type        = string
}
