output "table_name" {
  description = "Name of the created DynamoDB table"
  value       = aws_dynamodb_table.table.name
}

output "table_arn" {
  description = "ARN of the created DynamoDB table"
  value       = aws_dynamodb_table.table.arn
}

output "hash_key" {
  description = "Hash key (partition key) of the DynamoDB table"
  value       = var.hash_key
}

output "email_gsi_name" { 
  description = "Name of the Email GSI"
  value       = var.email_gsi_name
}

output "email_gsi_key" {
  description = "Key name of the Email GSI"
  value       = var.email_gsi_key
}

output "phone_gsi_name" {
  description = "Name of the Phone GSI"
  value       = var.phone_gsi_name
}

output "phone_gsi_key" {
  description = "Key name of the Phone GSI"
  value       = var.phone_gsi_key
}

output "document_gsi_name" {
  description = "Name of the Document GSI"
  value       = var.document_gsi_name
}

output "document_gsi_key" {
  description = "Key name of the Document GSI"
  value       = var.document_gsi_key
}
