module "lambda_shared" {
  source             = "./modules/shared"
  role_name          = "users_lambda_role"
  dynamodb_table_arn = module.dynamodb.table_arn
}

# REGISTER LAMBDA
module "register_user_lambda" {
  source = "./modules/lambda"

  function_name             = "register_user_lambda"
  lambda_role_arn           = module.lambda_shared.lambda_role_arn
  zip_file                  = "${path.module}/../lambda/register.zip"
  source_code_hash          = filebase64sha256("${path.module}/../lambda/register.zip")
  api_gateway_id            = module.api_gateway_shared.api_id
  api_gateway_execution_arn = module.api_gateway_shared.execution_arn

  environment_variables = {
    ENV = "dev"
  }
}

# REGISTER ROUTE
resource "aws_apigatewayv2_route" "register_user_route" {
  api_id    = module.api_gateway_shared.api_id
  route_key = "POST /users/register"
  target    = "integrations/${module.register_user_lambda.integration_id}"
}
