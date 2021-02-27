////////////////////////////////////////////////////
///   THE SERVER PART    ///////////////////////////
////////////////////////////////////////////////////
var express = require('express');
let Queue = require('bull');

const port = process.env.PORT || 3000;
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
let jobResult = '';

console.log('Starting server...');

var app = express();
let workQueue = new Queue('work', REDIS_URL); 

app.use(express.json());

app.post('/data', async function(req, res) {
    console.log(`---------------\n\nPOST req : ${JSON.stringify(req.body)}`);

    let job = await workQueue.add(req.body)

    res.json({id : job.id});
});

app.get('/job/:id', async (req, res) => {
  let id = req.params.id;
  let job = await workQueue.getJob(id);

  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    
    if(state === "completed") {
      let json = jobResult;

      res.json(json);
    }else {
      let result = job.data;
      let progress = job._progress;
      let reason = job.failedReason;
      res.json({ id, state, progress, result, reason });
    }
  }
});

workQueue.on('global:completed', (jobId, result) => {
    jobResult = result;
    console.log(`[job${jobId}] Job completed with result: ${result}`);
  });

app.listen(port , function() {
    console.log(`---------------\nPORT: ${port}\n---------------`)
})