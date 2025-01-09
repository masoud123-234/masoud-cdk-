#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MasoudDay4BetswayStack } from '../lib/masoud-day4-betsway-stack';
import { MasoudDay4ec2all } from '../lib/masoud-day4-ec2all';

const app = new cdk.App();
new MasoudDay4BetswayStack(app, 'MasoudDay4BetswayStack', {
  
  
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

new MasoudDay4ec2all(app, 'MasoudDay4ec2all', {
  
  
  env: { account: '992382386705' , region:  'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

