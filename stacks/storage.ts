const bucket = new sst.aws.Bucket('Bucket', {
	access: 'public',
});

export { bucket };
