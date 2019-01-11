// Make connetion
const socket = io.connect('http://localhost:4000');

// obtener objetos del documento
var message = document.getElementById('message'),
    nickname = document.getElementById('nickname'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// signación de eventos
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        nickname: nickname.value
    });
    message.value = "";
});

message.addEventListener('keypress', () => {
    socket.emit('typing', nickname.value);
})
// escuchar eventos
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.nickname}:</strong> ${data.message}</p>`;
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});