#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkTodoStack } from '../lib/cdk-todo-stack';

const app = new cdk.App();
new CdkTodoStack(app, 'CdkTodoStack');
