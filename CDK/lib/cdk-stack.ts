import { aws_ec2, aws_ecs, Stack, StackProps, aws_iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Subnet, SubnetType, SubnetProps } from 'aws-cdk-lib/aws-ec2';
// import { Vpc, SubnetType, VpcProps } from '@aws-cdk/aws-ec2';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const vpc = new ec2.Vpc(this, 'Vpc', 
    { 
    subnetConfiguration: [
      {
        name: 'SubnetA',
        subnetType: SubnetType.PUBLIC,
        cidrMask: 24,
        mapPublicIpOnLaunch: true
      },
     ],
    maxAzs: 1,
    cidr: '10.0.0.0/16',
    enableDnsHostnames: true,
    enableDnsSupport: true,
    vpcName: 'myvpc'
    });

    

    const cluster = new aws_ecs.Cluster(this, 'EcsCluster', { 
    vpc,
    clusterName: 'emil-devops-intern',
    
  });
  

  const FEFargateTaskDefinition = new aws_ecs.FargateTaskDefinition(this, 'FETaskDefinition', {
    memoryLimitMiB: 512,
    cpu: 256
  });
  const container = FEFargateTaskDefinition.addContainer("MyFEContainer", {
    // Use an image from DockerHub
    image: aws_ecs.ContainerImage.fromRegistry("petrovskiemil/my-fe-app"),
    // ... other options here ...
    containerName: 'my-fe-container'
  });
  }
}
