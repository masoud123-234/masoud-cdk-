import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MasoudEc2VpnDay3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      // using default vpc 
      const vpc = ec2.Vpc.fromLookup(this,'masoudvpc',{
        isDefault: true
      });
      // creating ec2 instance
      const masoudvm1 = new ec2.Instance(this,'masoudvm1',{
        vpc,
        instanceType: new ec2.InstanceType('t2.micro'),
        machineImage: new ec2.AmazonLinuxImage(),
        keyPair: ec2.KeyPair.fromKeyPairName(this,'masoudkey','splunk-key'),
        //       splunk-key is original key name of aws account
        // so you have to use the same
        instanceName: 'masoud-linux-vm'
        // above name of my linux machine 
      });

      // printing instance ID 
    new cdk.CfnOutput(this,'ashuInstanceID',{
      description: 'this will print instance id',
      value: masoudvm1.instanceId,
    });
    // printing public dns 
    new cdk.CfnOutput(this,'masoudpublicdns',{
      value: masoudvm1.instancePublicDnsName
    });
  }
}

  

   