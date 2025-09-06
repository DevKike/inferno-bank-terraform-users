module "api_gateway_shared" {
  source = "./modules/api-gateway"

  api_name        = "users_service_api"
  api_description = "API Gateway for user's service"
}

output "api_endpoint" {
  description = "API Gateway endpoint URL"
  value       = module.api_gateway_shared.api_endpoint
}
