#!/usr/bin/env bash
echo 'if you want to run this outside docker do ./setup-s3.sh $(PWD)'

excelPath=${1:-/docker-entrypoint-initaws.d}

set -e
export TERM=ansi
export AWS_ACCESS_KEY_ID=foobar
export AWS_SECRET_ACCESS_KEY=foobar
export AWS_DEFAULT_REGION=eu-west-2
export PAGER=

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket wmt-web
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key dashboard/dashboard1.txt --body $excelPath/dashboard-file.txt
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key dashboard/dashboard2.txt --body $excelPath/dashboard-file.txt
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key dashboard/dashboard3.txt --body $excelPath/dashboard-file.txt
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key dashboard/dashboard4.txt --body $excelPath/dashboard-file.txt
aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-web --key dashboard/dashboard5.txt --body $excelPath/dashboard-file.txt
echo "S3 created bucket"