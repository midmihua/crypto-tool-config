const CronJob = require('cron').CronJob;

// try {
//     console.log('Before job initialize');
//     const processJob = new CronJob('*/10 * * * * *', () => {
//         const d = new Date();
//         console.log('Every 10th seconds: ', d);
//     });
//     console.log('After job initialize');
//     processJob.start();
//     console.log('Is job running? ', processJob.running);
// } catch (error) {
//     console.log('Run cron error occured');
// }


let isRunning = false;
console.log('Before job instantiation');
const job = new CronJob('* * * * * *', function () {
    const d = new Date();
    console.log('Check every second:', d, ', isRunning: ', isRunning);

    if (!isRunning) {
        isRunning = true;

        setTimeout(function () {
            console.log('Long running onTick complete:', new Date());
            isRunning = false;
        }, 3000);
        console.log('setTimeout triggered:', new Date());
    }
});
console.log('After job instantiation');
job.start();