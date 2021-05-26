onCreateProject(() => {
    project.COREGUIDELINESURL = "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#";
});
onCreateUser(user => {
    user.userData.firstName = "";
});


intent('(Hello|Hi|)', async jarvee => {
    if (jarvee.userData.firstName.value == null) {
        jarvee.play('Hello! My name is Jarvee, may I ask your name?');
        let name = await jarvee.then(getName);
        jarvee.play(`A pleasure to make your acquaintance ${name}`);
    }
    else {
        jarvee.play(`Hello ${jarvee.userData.firstName.value}! Good to hear from you again!`);
    }
});

intent('What is your name', reply('My name is Jarvee Alan Vanderbuilt.'));

intent('(What is your|Do you have a) (middle|last) name', reply('According to my manufacturer, Alan'));

intent('(Thank you|Thanks|You\'re a lifesaver|)', reply('My pleasure! I\'m glad I can help!', 'I try my best!'));

// Show Web Page Intent
intent('Show me the web (site|page)', 'Can you pull up the web (site|page)', '(Show|Bring Up|) the web site', 'Show me the guidelines', async jarvee => {
    jarvee.play('Sure thing. Pulling up the guidelines now')
    let page_url = project.COREGUIDELINESURL + 'main';
    jarvee.play({command: 'showWebPage', page_url});
});

let getName = context(() => {
    intent('My (name is| name\'s) $(NAME)', '$(NAME)', jarvee => {
        jarvee.userData.firstName = jarvee.userData.firstName + jarvee.NAME.value;
        console.log(jarvee.userData.firstName);
        return jarvee.resolve(jarvee.NAME.value);
    });
});