output "api_id" {
  description = "ID for the API Gateway"
  value       = aws_apigatewayv2_api.api.id
}

output "api_arn" {
  description = "ARN of the API Gateway"
  value       = aws_apigatewayv2_api.api.arn
}

output "api_endpoint" {
  description = "URL of the API endpoint"
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "execution_arn" {
  description = "Execution ARN for Lambda permissions"
  value       = aws_apigatewayv2_api.api.execution_arn
}