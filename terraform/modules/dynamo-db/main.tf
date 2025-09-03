resource "aws_dynamodb_table" "table" {
  name         = var.table_name
  billing_mode = var.billing_mode
  hash_key     = var.hash_key

  attribute {
    name = var.hash_key
    type = var.hash_key_type
  }

  attribute {
    name = var.gsi_key
    type = var.gsi_key_type
  }

  global_secondary_index {
    name            = var.gsi_name
    hash_key        = var.gsi_key
    projection_type = var.gsi_projection_type
    read_capacity   = 5
    write_capacity  = 5
  }
}
