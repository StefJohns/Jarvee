onCreateProject(() => {
    project.COREGUIDELINESURL = "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#";
    project.SECTIONSPAGEEXTENTIONS = "S-interfaces|functions|S-class|S-enum|resource management|expressions and statements|performance|concurrency|error handling|constants and immutability|templates and generic programming|c-style programming|source files|standard library";
});
onCreateUser(user => {
    user.userData.firstName = "";
});

intent('What is your name', reply('My name is Jarvee Alan Vanderbuilt.'));

intent('(What is your|Do you have a) (middle|last) name', reply('According to my manufacturer, Alan'));

intent('(Thank you|Thanks|You\'re a lifesaver|)', reply('My pleasure! I\'m glad I can help!', 'I try my best!'));

// Show Web Page Intent
intent('Show me the web (site|page)', 'Can you pull up the web (site|page)', '(Show|Bring Up|) the web site', 'Show me the guidelines', async jarvee => {
    let page_url = project.COREGUIDELINESURL + 'main';
    jarvee.play({command: 'showWebPage', page_url});
    jarvee.play('Sure thing. Pulling up the guidelines now')
});