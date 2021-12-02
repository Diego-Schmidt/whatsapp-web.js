const { Client, Location, List, Buttons, sendMessage, Message, MessageMedia, chat, Chat, PrivateChat, GroupChat, ClientInfo } = require('./index');
const client = new Client({ puppeteer: { headless: true, args: ['--no-sandbox'] }, clientId: 'example' });
const fs = require('fs');
// const exchanges = require('@coinranking/exchanges');
const CoinGecko = require('coingecko-api');
// const { DateTime } = require("luxon");
const os = require('os');
// const urlExist = require('url-exists');
const yaml = require('js-yaml');
const path = require('path');
const Bree = require('bree');
var exec = require('ssh-exec') // este módulo es inseguro
const request = require('native-request');
// const Iconv = require('iconv').Iconv;
const schedule = require('node-schedule');
const Nodebook = require('nodejs-notebook');
const myNotebook = new Nodebook.Nodebook('notebook', 'txt');
const fileGetContents = require('file-get-contents');
const process = require('process');

// You also could connect to an existing instance of a browser
// {
//    puppeteer: {
//        browserWSEndpoint: `ws://localhost:3000`
//    }
// }


client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);
	
	if (msg.body === '!@ayuda') {
  client.sendMessage(msg.from, 'El comando correcto es !@yuda');
  }

// comando para desactivar el modo mantenimiento individualmente en sitios del tipo subdominio.multisitewordpress.com de un wordpress multisite usando seedprod

if (msg.body.startsWith('!@brirland ')) {
var limpio =  msg.body.slice(11); // limpio el input para quedarme con el nombre del subdominio
var sitio = limpio+'.multisitewordpress.com'; // uno el input con el dominio para crear la url del subdominio
// función para que sólo el admin pueda ejecutar este comando
if (!["numeroadmin@c.us"].includes(msg.author || msg.from)) return msg.reply("No estás autorizado a usar este comando.");
else {
       exec(`cd /home/multisitewordpress.com/public_html && wp plugin deactivate coming-soon --url=${sitio} --allow-root && cualquier otro comando`, {
  user: 'usuariossh',
  host: 'ip',
  password: 'contraseña\''
}).pipe(process.stdout)
        client.sendMessage(msg.from,'Subsitio '+sitio+' abierto');
	}
}

// comando para activar el modo mantenimiento individualmente en sitios del tipo subdominio.multisitewordpress.com de un wordpress multisite usando seedprod

if (msg.body.startsWith('!cerr@rland ')) {
var limpio =  msg.body.slice(12); // limpio el input para quedarme con el nombre del subdominio
var sitio = limpio+'.multisitewordpress.com'; // uno el input con el dominio para crear la url del subdominio
// función para que sólo el admin pueda ejecutar este comando
if (!["numeroadmin@c.us"].includes(msg.author || msg.from)) return msg.reply("No estás autorizado a usar este comando.");
else {
       exec(`cd /home/multisitewordpress.com/public_html && wp plugin activate coming-soon --url=${final} --allow-root && cualquier otro comando`, {
  user: 'usuario',
  host: 'ip',
  password: 'clave\''
}).pipe(process.stdout)
        client.sendMessage(msg.from,'Subsitio '+sitio+' cerrado');
	}
}
// fin comandos para abrir y cerrar landings individualmente

// ayuda para los comandos de administradores
if (msg.body === '!@yuda'){
// función para que sólo el admin pueda ejecutar este comando
if (!["númeroadmin@c.us"].includes(msg.author || msg.from)) return msg.reply("No estás autorizado a usar este comando.");
else {
 const user = await msg.getContact();
        msg.reply(`Hola @${user.pushname} estos son los comandos para admins:
*- descripción de un comando
`);
}
}

// ayuda para comandos públicos
if (msg.body === '!ayuda') {
        // le responde a quien ejecuta el comando
		const user = await msg.getContact();
        msg.reply(`Hola @${user.pushname} estos son los comandos de ayuda que tiene el bot PaYa: 
*- !ayuda muestra esta ayuda
*- !otro comando
*`);
}

// comando para mostrar el valor en dólares de criptomonedas usando la api de coingecko

if (msg.body === '!cripto') {
const CoinGeckoClient = new CoinGecko();
    //podemos elegir que monedas mostrar y en que exchange buscar los valores //https://www.coingecko.com/es/intercambios
	let data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
        coin_ids: ['bitcoin', 'ethereum', 'cardano', 'solana',]
    });
    var _coinList = {};
    var _datacc = data.data.tickers.filter(t => t.target == 'USD');
    [
        'BTC',
        'ETH',
        'ADA',
        'SOL',
//      'DOGE'
    ].forEach((i) => {
        var _temp = _datacc.filter(t => t.base == i);
        var _res = _temp.length == 0 ? [] : _temp[0];
        _coinList[i] = _res.last;
    })
        //convierte el objeto en cadena para poder enviarse por sendMessage
		var criptos = JSON.stringify(_coinList);
        //limpiamos la cadena de carácteres no deseados
		var valrep = criptos.replace(/[&\/\\#+()$~"*?<>{}]/g,' ');
        //agregamos un breakline luego de cada coma para mostrar mejor la lista
		var valrep2 = valrep.replace(/,/g, '\n');
		//corregimos un espacio inicial que queda feo
		var valrep3 = valrep2.replace(' B','B');
  console.log(_coinList);
        client.sendMessage(msg.from,valrep3)
}

// comando para mostrar la hora de distintos países
if (msg.body === '!hora') {
        // Send a new message as a reply to the current one
                var pana = new Date().toLocaleString('es-ES', { timeZone: 'America/Panama' }); 
                var arg = new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' });
        client.sendMessage(msg.from, '*Hora Panamá* = '+pana);
        client.sendMessage(msg.from, '*Hora Argentina* = '+arg);
     }
if (msg.body === '!ping reply') {
        // Send a new message as a reply to the current one
        msg.reply('pong');
     }
	  else if (msg.body === '!ke') {
        // Manda stiker de JM con cara rara
        const media = MessageMedia.fromFilePath('./media/ke.png');
                client.sendMessage(msg.from, media, { sendMediaAsSticker: true});
        }
	
// comando para ver notas agregadas a un txt usando el módulo Nodebook
    else if (msg.body.startsWith('!notas')){
myNotebook.fileName({ lower: false });
const user = await msg.getContact();
contenido = myNotebook.content();
client.sendMessage(msg.from, contenido);
}
// borrar todas las notas del txt
else if (msg.body.startsWith('!borrarnotas')){
myNotebook.resetFile();
client.sendMessage(msg.from, 'Notas borradas');
}
// agregar una nota al txt de NodeBook
else if (msg.body.startsWith('!anotar ')) {
var a = new Date();
// agrego un timestamp de creación a la nota
var ts = new Date().toLocaleString('es-ES', { timeZone: 'America/Panama' });
// var ts =  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')  ;
const user = await msg.getContact();
// le agrego a la nota el nombre del usuario que la agregó
var por =` por ${user.pushname} -- `;
var limpiar =  msg.body.slice(8)  ;
var texto = ts + por + limpiar;
var sep = ' --';
// creo la nota y le agrego un salto de línea
myNotebook.addLine(texto+sep+"\r\n");
client.sendMessage(msg.from, 'Nota agregada');
}
// comando para ver una línea específica
else if (msg.body.startsWith('!verlinea ')) {
myNotebook.fileName({ lower: false });
var linea = msg.body.slice(10);
var eleccion = myNotebook.fetchLine(linea);
client.sendMessage(msg.from, eleccion);
}
// comando para borrar una línea específica o nota
else if (msg.body.startsWith('!borrarnota ')) {
myNotebook.fileName({ lower: false });
var bnote = msg.body.slice(12);
var borr = myNotebook.deleteLine(bnote);
client.sendMessage(msg.from, 'Nota borrada');
}

} else if (msg.body.startsWith('!mensajea ')) {
        // Direct send a new message to specific id
        let number = msg.body.split(' ')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        chat.sendSeen();
        client.sendMessage(number, message);
        msg.reply('mensaje enviado');
} else if (msg.body.startsWith('!grupoasunto ')) {
        // Change the group subject
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newSubject = msg.body.slice(9);
            chat.setSubject(newSubject);
        } else {
            msg.reply('Comando para ser usado en grupos!');
        }
    } else if (msg.body.startsWith('!echo ')) {
        // Replies with the same message
        msg.reply(msg.body.slice(6));
    } else if (msg.body.startsWith('!grupodesc ')) {
        // Change the group description
        let chat = await msg.getChat();
        if (chat.isGroup) {
            let newDescription = msg.body.slice(6);
            chat.setDescription(newDescription);
        } else {
            msg.reply('Comando para ser usado en grupos!');
        }
    } else if (msg.body === '!salir') {
        // Leave the group
        let chat = await msg.getChat();
        if (chat.isGroup) {
            chat.leave();
        } else {
            msg.reply('Comando para ser usado en grupos!');
        }
    } else if (msg.body.startsWith('!entrar ')) {
        const inviteCode = msg.body.split(' ')[1];
        try {
            await client.acceptInvite(inviteCode);
            msg.reply('Entre al grupo!');
        } catch (e) {
            msg.reply('El código de invitación parece incorrecto.');
        }
    } else if (msg.body === '!grupoinfo') {
        let chat = await msg.getChat();
        if (chat.isGroup) {
            msg.reply(`
                *Detalles del grupo*
                Nombre: ${chat.name}
                Descripción: ${chat.description}
                Creación: ${chat.createdAt.toString()}
                Creado por: ${chat.owner.user}
                Participantes: ${chat.participants.length}
            `);
        } else {
            msg.reply('Comando para ser usado en grupos!');
        }
    } else if (msg.body === '!chats') {
        const chats = await client.getChats();
        client.sendMessage(msg.from, `El bot tiene ${chats.length} chats abiertos.`);
    } else if (msg.body === '!info') {
if (superadmin);
else {
var ut_sec = os.uptime();
var ut_min = ut_sec/60;
var ut_hour = ut_min/60;
   
ut_sec = Math.floor(ut_sec);
ut_min = Math.floor(ut_min);
ut_hour = Math.floor(ut_hour);
  
ut_hour = ut_hour%60;
ut_min = ut_min%60;
ut_sec = ut_sec%60;

var bt_sec = process.uptime();
var bt_min = bt_sec/60;
var bt_hour = bt_min/60;
   
bt_sec = Math.floor(bt_sec);
bt_min = Math.floor(bt_min);
bt_hour = Math.floor(bt_hour);
  
bt_hour = bt_hour%60;
bt_min = bt_min%60;
bt_sec = bt_sec%60;
let osver = os.release();
let ospla = os.platform();
let ostyp = os.type();
 let info = client.info;
        client.sendMessage(msg.from, `
            *Información del bot*
            Usuario: ${info.pushname}
            Mi número: ${info.me.user}
            Plataforma: ${info.platform}
            WhatsApp: ${info.phone.wa_version}
            Bot Up: ${bt_hour} hs ${bt_min} ms ${bt_sec} ss
            Serv Up: ${ut_hour} hs ${ut_min} ms ${ut_sec} ss
            Server: ${osver} ${ostyp}
        `);
}
    } else if (msg.body === '!mediainfo' && msg.hasMedia) {
        const attachmentData = await msg.downloadMedia();
        msg.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
    } else if (msg.body === '!quoteinfo' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();

        quotedMsg.reply(`
            ID: ${quotedMsg.id._serialized}
            Tipo: ${quotedMsg.type}
            Autor: ${quotedMsg.author || quotedMsg.from}
            Hora: ${quotedMsg.timestamp}
            Tiene Medios? ${quotedMsg.hasMedia}
        `);
    } else if (msg.body === '!reenvmedia' && msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            const attachmentData = await quotedMsg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, { caption: 'Aquí está la multimedia solicitada.' });
        }
    } else if (msg.body === '!oficinas') {
        msg.reply(new Location(9.0090439, -79.5361487, 'Oficinas de PaYá'));
    } else if (msg.location) {
        msg.reply(msg.location);
    } else if (msg.body.startsWith('!estado ')) {
        const newStatus = msg.body.split(' ')[1];
        await client.setStatus(newStatus);
        msg.reply(`Estado actualizado a *${newStatus}*`);
    } else if (msg.body === '!mencion') {
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`Hola @${contact.number}!`, {
            mentions: [contact]
        });
    } else if (msg.body === '!borrar') {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.fromMe) {
                quotedMsg.delete(true);
            } else {
                msg.reply('Sólo puedo borrar mis propios mensajes');
            }
        }
    } else if (msg.body === '!pin') {
        const chat = await msg.getChat();
        await chat.pin();
    } else if (msg.body === '!archivo') {
        const chat = await msg.getChat();
        await chat.archive();
    } else if (msg.body === '!mutear') {
        const chat = await msg.getChat();
        // mute the chat for 20 seconds
        const unmuteDate = new Date();
        unmuteDate.setSeconds(unmuteDate.getSeconds() + 20);
        await chat.mute(unmuteDate);
    } else if (msg.body === '!tipeando') {
        const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
    } else if (msg.body === '!grabando') {
        const chat = await msg.getChat();
        // simulates recording audio in the chat
        chat.sendStateRecording();
    } else if (msg.body === '!limpiarestado') {
        const chat = await msg.getChat();
        // stops typing or recording in the chat
        chat.clearState();
    } else if (msg.body === 'jumpto') {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            client.interface.openChatWindowAt(quotedMsg.id._serialized);
        }
    }
});

client.on('message_create', (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe) {
        // do stuff here
    }
});

client.on('message_revoke_everyone', async (after, before) => {
    // Fired whenever a message is deleted by anyone (including you)
    console.log(after); // message after it was deleted.
    if (before) {
        console.log(before); // message before it was deleted.
    }
});

client.on('message_revoke_me', async (msg) => {
    // Fired whenever a message is only deleted in your own view.
    console.log(msg.body); // message before it was deleted.
});

client.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

    if(ack == 3) {
        // The message was read
    }
});

client.on('group_join', (notification) => {
    // User has joined or been added to the group.
    console.log('entra', notification);
    notification.reply('Usuario entró.');
});

client.on('group_leave', (notification) => {
    // User has left or been kicked from the group.
    console.log('sale', notification);
    notification.reply('Usuario salió.');
});

client.on('group_update', (notification) => {
    // Group picture, subject or description has been updated.
    console.log('actualización', notification);
});

client.on('change_battery', (batteryInfo) => {
    // Battery percentage for attached device has changed
    const { battery, plugged } = batteryInfo;
    console.log(`Batería: ${battery}% - Cargando? ${plugged}`);
});

client.on('change_state', state => {
    console.log('CAMBIAR ESTADO', state );
});

client.on('disconnected', (reason) => {
    console.log('El cliente se desconectó', reason);
});

