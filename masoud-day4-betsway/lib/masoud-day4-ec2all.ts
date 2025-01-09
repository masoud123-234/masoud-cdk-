import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MasoudDay4ec2all extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // using default vpc 
    const vpc = ec2.Vpc.fromLookup(this,'masoudvpc',{
      isDefault: true
    });

    // Create a security group
    const securityGroup = new ec2.SecurityGroup(this, 'masoudSecurityGroup', {
      vpc,
      description: 'Allow SSH and HTTP traffic',
      allowAllOutbound: true
    });
    //allow inbound traffic on port 443 (HTTPs) from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS access from anywhere');
    // Allow inbound traffic on port 22 (SSH) from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH access from anywhere');

    // Allow inbound traffic on port 80 (HTTP) from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP access from anywhere');

    // creating ec2 instance
    const masoudvm1 = new ec2.Instance(this,'masoudvm1',{
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyPair: ec2.KeyPair.fromKeyPairName(this,'masoudkey','splunk-key'),
      //       splunk-key is original key name of aws account
      // so you have to use the same
      instanceName: 'masoud-linux-vm1',
      securityGroup // Attach the security group to the instance
      // above name of my linux machine 
    });

    
    
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MasoudDay4BetswayQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
