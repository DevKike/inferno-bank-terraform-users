module "jwt_authorizer_lambda" {
  source = "./modules/lambda"

  function_name             = "jwt_authorizer"
  lambda_role_arn           = module.lambda_shared.lambda_role_arn
  zip_file                  = "${path.module}/../lambda/jwt-authorizer.zip"
  source_code_hash          = filebase64sha256("${path.module}/../lambdas/jwt-authorizer.zip")
  api_gateway_id            = module.api_gateway.api_id
  api_gateway_execution_arn = module.api_gateway.execution_arn

  environment_variables = {
    jwtSecretKey = var.jwt_secret_key
  }
}

resource "aws_apigatewayv2_authorizer" "jwt_authorizer" {
  api_id                            = module.api_gateway_shared.api_id
  authorizer_type                   = "REQUEST"
  identity_sources                  = ["$request.header.Authorization"]
  name                              = "jwt_authorizer"
  authorizer_uri                    = module.jwt_authorizer_lambda.invoke_arn
  authorizer_payload_format_version = "2.0"
}

resource "aws_lambda_permission" "allow_api_gateway_invoke_authorizer" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.jwt_authorizer_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api_gateway_shared.execution_arn}/*/*"
}
