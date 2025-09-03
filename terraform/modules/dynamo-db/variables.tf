variable "table_name" {
  description = "Name of the DynamoDB table"
  type        = string
  default     = "users"
}

variable "billing_mode" {
  description = "Controls how you are charged for read and write throughput"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "hash_key" {
  description = "Partition key name"
  type        = string
  default     = "uuid"
}

variable "hash_key_type" {
  description = "Partition key type"
  type        = string
  default     = "S"
}

variable "gsi_name" {
  description = "Name of the GSI"
  type        = string
  default     = "EmailIndex"
}

variable "gsi_key" {
  description = "GSI partition key"
  type        = string
  default     = "email"
}

variable "gsi_key_type" {
  description = "GSI partition key type"
  type        = string
  default     = "S"
}

variable "gsi_projection_type" {
  description = "ProjectionType for the GSI"
  type        = string
  default     = "ALL"
}
