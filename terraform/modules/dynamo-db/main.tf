resource "aws_dynamodb_table" "table" {
  name         = var.table_name
  billing_mode = var.billing_mode
  hash_key     = var.hash_key

  attribute {
    name = var.hash_key
    type = var.hash_key_type
  }

  attribute {
    name = var.email_gsi_key
    type = var.email_gsi_key_type
  }

  attribute {
    name = var.phone_gsi_key
    type = var.phone_gsi_key_type
  }

  attribute {
    name = var.document_gsi_key
    type = var.document_gsi_key_type
  }

  global_secondary_index {
    name            = var.email_gsi_name
    hash_key        = var.email_gsi_key
    projection_type = var.gsi_projection_type
  }

  global_secondary_index {
    name            = var.phone_gsi_name
    hash_key        = var.phone_gsi_key
    projection_type = var.gsi_projection_type
  }

  global_secondary_index {
    name            = var.document_gsi_name
    hash_key        = var.document_gsi_key
    projection_type = var.gsi_projection_type
  }
}
