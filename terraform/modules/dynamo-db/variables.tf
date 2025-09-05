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

variable "email_gsi_name" {
  description = "Name of the GSI for email"
  type        = string
  default     = "EmailIndex"
}

variable "email_gsi_key" {
  description = "GSI partition key for email"
  type        = string
  default     = "email"
}

variable "email_gsi_key_type" {
  description = "GSI partition key type for email"
  type        = string
  default     = "S"
}

variable "phone_gsi_name" {
  description = "Name of the GSI for phone"
  type        = string
  default     = "PhoneIndex"
}

variable "phone_gsi_key" {
  description = "GSI partition key for phone"
  type        = string
  default     = "phone"
}

variable "phone_gsi_key_type" {
  description = "GSI partition key type for phone"
  type        = string
  default     = "S"
}

variable "document_gsi_key" {
  description = "GSI partition key for document"
  type        = string
  default     = "document"
}

variable "document_gsi_name" {
  description = "Name of the GSI for document"
  type        = string
  default     = "DocumentIndex"
}

variable "document_gsi_key_type" {
  description = "GSI partition key type for document"
  type        = string
  default     = "S"
}

variable "gsi_projection_type" {
  description = "ProjectionType for the GSI"
  type        = string
  default     = "ALL"
}
