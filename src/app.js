const CronJob = require('cron').CronJob;

try {
    console.log('Before job initialize');
    const processJob = new CronJob('*/10 * * * * *', () => {
        const d = new Date();
        console.log('Every 10th seconds: ', d);
    });
    console.log('After job initialize');
    processJob.start();
    console.log('Is job running? ', processJob.running);
} catch (error) {
    console.log('Run cron error occured');
}