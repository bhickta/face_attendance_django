$(document).ready(function () {
    main()
});

async function main() {
    const buttonStart = document.querySelector('#buttonStart')
    const buttonStop = document.querySelector('#buttonStop')
    const videoLive = document.querySelector('#videoLive')
    const videoRecorded = document.querySelector('#videoRecorded')

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    })

    videoLive.srcObject = stream

    if (!MediaRecorder.isTypeSupported('video/webm')) {
        console.warn('video/webm is not supported')
    }

    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
    })

    buttonStart.addEventListener('click', () => {
        mediaRecorder.start()
        buttonStart.setAttribute('disabled', '')
        buttonStop.removeAttribute('disabled')
    })

    buttonStop.addEventListener('click', () => {
        mediaRecorder.stop()
        buttonStart.removeAttribute('disabled')
        buttonStop.setAttribute('disabled', '')
    })

    mediaRecorder.addEventListener('dataavailable', event => {
        videoRecorded.src = URL.createObjectURL(event.data)
    })
}
