import * as cdk from '@aws-cdk/core';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import { SPADeploy } from 'cdk-spa-deploy';

import { TodoBackend } from './todo-backend';
export class CdkTodoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoBackend = new TodoBackend(this, 'TodoBackend');

    new apiGateway.LambdaRestApi(this, 'Endpoint', {
      handler: todoBackend.handler,
    });

    const logoBucket = new s3.Bucket(this, 'LogoBucket', {
      publicReadAccess: true,
    });

    new s3Deployment.BucketDeployment(this, 'DeployLog', {
      destinationBucket: logoBucket,
      sources: [s3Deployment.Source.asset('./assets')],
    });

    new cdk.CfnOutput(this, 'LogoPath', {
      value: `https://${logoBucket.bucketDomainName}/corn.jpg`,
    });

    new SPADeploy(this, 'spaDeploy').createSiteWithCloudfront({
      indexDoc: 'index.html',
      websiteFolder: '../frontend/build',
    });
  }
}
