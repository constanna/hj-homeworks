const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  let data = JSON.parse(event.data);

  if (isFirst) {
    data.forEach(obj => realtime.addData([obj.online], obj.time));
    isFirst = false;
  } else {
    realtime.addData([data.online], data.time);
    realtime.removeData();
  }
});
