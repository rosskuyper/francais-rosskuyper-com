module "s3_cdn_francais_rosskuyper_com" {
  source = "rosskuyper/s3-cloudfront/aws"

  name = local.service_name

  certificate_arn = data.terraform_remote_state.environment.outputs.rosskuyper_com_acm_arn
  domain_names = [
    "francais.rosskuyper.com",
  ]
}

resource "aws_ssm_parameter" "cdn_bucket_name" {
  name      = "/${local.service_name}/web_cdn_bucket_name"
  type      = "String"
  value     = module.s3_cdn_francais_rosskuyper_com.s3_bucket_name
  overwrite = "true"
}

resource "aws_ssm_parameter" "cdn_distribution_id" {
  name      = "/${local.service_name}/cloudfront_id"
  type      = "String"
  value     = module.s3_cdn_francais_rosskuyper_com.cloudfront_id
  overwrite = "true"
}
