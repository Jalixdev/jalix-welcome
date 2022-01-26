const Discord = require('discord.js');
const tokens = [
    "1.TOKEN",
    "2.TOKEN",
    "3.TOKEN"
];
const chnls = [
    "1.TOKEN SES KANAL",
    "2. TOKEN SES KANAL",
    "3. TOKEN SES KANAL",
];
const jalixli = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let jalix;
    client.on('ready', async () => {
        console.log(client.user.username);
        await client.user.setActivity({
            name: "Jalix's Welcome Bots",
            type: "PLAYING"
        });
        jalix = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if (jalixli.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("934894852620054528").rawPosition)) {//KAYITSIZ ROLÜ ÜSTÜNDE HERHANGİ BİR ROL ID

                ses = await jalix.play('./tekrardan.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("934894852620054528").rawPosition)) { //KAYITSIZ ROLÜ ÜSTÜNDE HERHANGİ BİR ROL ID
                ses = await jalix.play('./hosgeldin.mp3');
                jalixli.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get('934894803181776916').rawPosition) {//YETKİ PERMLERİNİN ALTINDA HERHANGİ BİR ROL ID
                ses = await jalix.play('./yetkili.mp3');
                jalixli.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('guildMemberUpdate', async (prev, cur) => {
        if (jalix.channel.members.some(biri => biri.user.id === cur.user.id)) {
            if ((prev.roles.highest.rawPosition < cur.roles.highest.rawPosition)) {
                ses = await jalix.play('./elveda.mp3');
            }
        } else return;
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) jalix = await client.channels.cache.get(chnls[index]).join();
    })
}
