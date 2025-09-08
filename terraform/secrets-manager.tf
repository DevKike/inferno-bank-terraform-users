module "secrets_manager_shared" {
  source                      = "./modules/secrets-manager"
  secrets_manager_description = "Secrets manager for users service"
  secrets_manager_key_value   = var.secrets_manager_key_value
}
