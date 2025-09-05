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
    awsRegion          = var.aws_region
    tableName          = module.dynamodb.table_name
    secretsManagerName = module.secrets_manager_shared.secrets_manager_name
    emailIndexName     = module.dynamodb.email_gsi_name
    emailIndexKey      = module.dynamodb.email_gsi_key
    phoneIndexName     = module.dynamodb.phone_gsi_name
    phoneIndexKey      = module.dynamodb.phone_gsi_key
    documentIndexName  = module.dynamodb.document_gsi_name
    documentIndexKey   = module.dynamodb.document_gsi_key
  }
}

# REGISTER ROUTE
resource "aws_apigatewayv2_route" "register_user_route" {
  api_id    = module.api_gateway_shared.api_id
  route_key = "POST /users/register"
  target    = "integrations/${module.register_user_lambda.integration_id}"
}

# LOGIN LAMBDA
module "login_user_lambda" {
  source = "./modules/lambda"

  function_name             = "login_user_lambda"
  lambda_role_arn           = module.lambda_shared.lambda_role_arn
  source_code_hash          = filebase64sha256("${path.module}/../lambda/login.zip")
  zip_file                  = "${path.module}/../lambda/login.zip"
  api_gateway_id            = module.api_gateway_shared.api_id
  api_gateway_execution_arn = module.api_gateway_shared.execution_arn

  environment_variables = {
    awsRegion = var.aws_region
    tableName : module.dynamodb.table_name
    emailIndexName     = module.dynamodb.email_gsi_name
    emailIndexKey      = module.dynamodb.email_gsi_key
    secretsManagerName = module.secrets_manager_shared.secrets_manager_name
    jwtSecretKey       = var.jwt_secret_key
    jwtTokenExpiration = var.jwt_token_expiration
  }

}

# LOGIN ROUTE
resource "aws_apigatewayv2_route" "login_user_route" {
  api_id    = module.api_gateway_shared.api_id
  route_key = "POST /users/login"
  target    = "integrations/${module.login_user_lambda.integration_id}"
}

# UPDATE USER LAMBDA
module "update_user_lambda" {
  source = "./modules/lambda"

  function_name             = "update_user_lambda"
  lambda_role_arn           = module.lambda_shared.lambda_role_arn
  source_code_hash          = filebase64sha256("${path.module}/../lambda/update.zip")
  zip_file                  = "${path.module}/../lambda/update.zip"
  api_gateway_id            = module.api_gateway_shared.api_id
  api_gateway_execution_arn = module.api_gateway_shared.execution_arn

  environment_variables = {
    awsRegion    = var.aws_region
    tableName    = module.dynamodb.table_name
    jwtSecretKey = var.jwt_secret_key
  }
}

# UPDATE USER ROUTE
resource "aws_apigatewayv2_route" "update_user_route" {
  api_id             = module.api_gateway_shared.api_id
  route_key          = "PUT /users/profile"
  target             = "integrations/${module.update_user_lambda.integration_id}"
  authorization_type = "CUSTOM"
  authorizer_id      = aws_apigatewayv2_authorizer.jwt_authorizer.id
}
