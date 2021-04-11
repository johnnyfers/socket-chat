const socket = io('http://localhost:3000');

let user = null;

socket.on('update_messages', (messages)=>{
    updateMessagesOnScreen(messages);
})

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>'
    messages.forEach(message=>{ list_messages += `<li>${message.user}: ${message.msg}</li>`})
    list_messages += '</ul>'

    div_messages.innerHTML = list_messages;
}

document.addEventListener('DOMContentLoaded', ()=>{
    console.log('Welcome to the Jun... CHAT')
    const form = document.querySelector('#message_form');
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        if(!user){
            user = 'anonymous';
        }

        const message = document.forms['message_form_name']['msg'].value;
        document.forms['message_form_name']['msg'].value = '';
        socket.emit('new_message', {user: user, msg: message})

    })

    console.log('Welcome to the Jun... CHAT')
    const userForm = document.querySelector('#user_form');
    
    userForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        user = document.forms['user_form_name']['user'].value;
        userForm.parentNode.removeChild(userForm)
        
        
    })
})