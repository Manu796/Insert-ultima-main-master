var w = null
        var ggdl, ggul, ggping
        function runTest() {
            w = new Worker('speedtest_worker.min.js')
            var interval = setInterval(function () { w.postMessage('status') }, 100)
            document.getElementById('abortBtn').style.display = ''
            document.getElementById('startBtn').style.display = 'none'
            w.onmessage = function (event) {
                var data = event.data.split(';')
                var status = Number(data[0])
                if (status >= 4) {
                    clearInterval(interval)
                    document.getElementById('abortBtn').style.display = 'none'
                    document.getElementById('startBtn').style.display = ''
                    w = null
                }
                updateGauge(ggdl, data[1])
                updateGauge(ggul, data[2])
                //updateGauge(ggping, data[3])
                document.getElementById('ip').textContent = 'Su direccion IP es: ' + data[4]
                //updateGauge(ggjitter, data[5])
            }
            w.postMessage('start {"time_ul": "15", "time_dl": "15", "count_ping": "1", "url_dl": "garbage.php", "url_ul": "empty.php", "url_ping": "empty.php", "url_getIp": "getIP.php"}')
        }
        function abortTest() {
            if (w) w.postMessage('abort')
        }

        document.addEventListener('DOMContentLoaded', function (event) {
            ggdl = new JustGage({
                id: 'ggdl',
                title: 'Descarga',
                label: 'Mbit/s',
                titleFontFamily: 'Open Sans',
                valueFontFamily: 'Open Sans',
                refreshAnimationTime: 300,
                value: 0,
                min: 0,
                max: 10,
                decimals: 2,
                formatNumber: true,
                humanFriendly: false,
                levelColors: [
                    '#999999',
                    '#339933'
                ]
            })

            ggul = new JustGage({
                id: 'ggul',
                title: 'Subida',
                label: 'Mbit/s',
                titleFontFamily: 'Open Sans',
                valueFontFamily: 'Open Sans',
                refreshAnimationTime: 300,
                value: 0,
                min: 0,
                max: 10,
                decimals: 2,
                formatNumber: true,
                humanFriendly: false,
                levelColors: [
                    '#999999',
                    '#333399'
                ]

            })

           /* ggping = new JustGage({
                id: 'ggping',
                title: 'Ping',
                label: 'ms',
                titleFontFamily: 'Open Sans',
                valueFontFamily: 'Open Sans',
                refreshAnimationTime: 300,
                value: 0,
                min: 0,
                max: 100,
                decimals: 2,
                formatNumber: true,
                humanFriendly: false,
                levelColors: [
                    '#999999',
                    '#993333'
                ]
            })
            ggjitter = new JustGage({
                id: 'ggjitter',
                title: 'Jitter',
                label: 'ms',
                titleFontFamily: 'Open Sans',
                valueFontFamily: 'Open Sans',
                refreshAnimationTime: 300,
                value: 0,
                min: 0,
                max: 100,
                decimals: 2,
                formatNumber: true,
                humanFriendly: false,
                levelColors: [
                    '#999999',
                    '#993333'
                ]
            })*/
        })

        function updateGauge(gauge, value) {
            // Alway use next power of 2 as maximum
            var max = Math.max(Math.pow(2, Math.ceil(Math.log2(value))), gauge.config.max)
            // Refresh the gauge
            gauge.refresh(value, max)
        }