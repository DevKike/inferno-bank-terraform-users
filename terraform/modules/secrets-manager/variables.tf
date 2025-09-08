variable "secrets_manager_name" {
  description = "User's secrets manager"
  type        = string
  default     = "secrets_user_service"
}

variable "secrets_manager_description" {
  description = "Secrets manager for users service"
  type        = string
  default     = "User's service secrets manager"
}

variable "secrets_manager_key_value" {
  description = "Sensitive key for the secret"
  type        = string
  sensitive   = true
}
