let launchButton = document.getElementById('launcher');
launchButton.addEventListener('click', () => {
    const req = new XMLHttpRequest();
    req.onload = (e) => {
        const body = JSON.parse(req.responseText);

        const socketLoc = encodeURIComponent(body.url.replace('https://', 'wss://'));
        const src = '/files/build/index.html?socketLoc=' + socketLoc;      

        console.log('Setting up Simulator...');
        const simFrameDiv = $('#simulator_frame').html('<iframe src="' + src + '" width="100%" height="500" />');
        
        setTimeout(() => {
            const simFrame = simFrameDiv.find('iframe');
            if (simFrame !== undefined) {
                window.simulatorWindow = simFrame[0].contentWindow;
                console.log('Acquired simulator window!');
            }
        }, 1000);
    };

    req.open('GET', '/udacityworkspaces/v1/porttranslation/3001/');
    req.withCredentials = true;
    req.send();
});
