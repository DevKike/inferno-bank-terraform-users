variable "api_name" {
  description = "User's API Gateway"
  type        = string
  default     = "users-api"
}

variable "api_description" {
  description = "API Gateway for users service"
  type        = string
  default     = "User's service API Gateway"
}

variable "auto_deploy" {
  description = "Enable automatic deployment when routes/integrations change"
  type        = bool
  default     = true
}

variable "stage_name" {
  description = "Default stage name"
  type        = string
  default     = "$default"
}