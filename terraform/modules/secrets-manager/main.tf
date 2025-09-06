resource "aws_secretsmanager_secret" "secrets_manager" {
  name        = var.secrets_manager_name
  description = var.secrets_manager_description

}

resource "aws_secretsmanager_secret_version" "secrets_manager_version" {
  secret_id     = aws_secretsmanager_secret.secrets_manager.id
  secret_string = jsonencode({ key : var.secrets_manager_key_value })
}
