#!/usr/bin/env bash
echo 'if you want to run this outside docker do ./setup-s3.sh $(PWD)'

excelPath=${1:-/docker-entrypoint-initaws.d}

set -e
export TERM=ansi
export AWS_ACCESS_KEY_ID=foobar
export AWS_SECRET_ACCESS_KEY=foobar
export AWS_DEFAULT_REGION=eu-west-2
export PAGER=

aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name audit_event_queue

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket wmt-web --region ${AWS_DEFAULT_REGION} --create-bucket-configuration LocationConstraint=${AWS_DEFAULT_REGION}
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key generated-dashboards/dashboard_20210729062147.txt --body $excelPath/dashboard-file.txt
sleep 1
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key generated-dashboards/dashboard_20210730062147.txt --body $excelPath/dashboard-file.txt
sleep 1
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key generated-dashboards/dashboard_20210731062147.txt --body $excelPath/dashboard-file.txt
sleep 1
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key generated-dashboards/dashboard_20210801062147.txt --body $excelPath/dashboard-file.txt
sleep 1
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key generated-dashboards/dashboard_20210802062147.txt --body $excelPath/dashboard-file.txt
echo "S3 created bucket"