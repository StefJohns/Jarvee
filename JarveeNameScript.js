intent('What is your name', reply('My name is Jarvee. Pleasure to make your acquaintance'));

intent('(What is your|Do you have a) (middle|last) name', reply('According to my manufacturer, Alan'));

intent('(Thank you|Thanks|You\'re a lifesaver|)', reply('My pleasure! I\'m glad I can help!', 'I try my best!'));

const Core_Guidelines_URL = 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#';

// Show Web Page Intent
intent('Show me the web (site|page)', 'Can you pull up the web (site|page)', '(Show|Bring Up|) the web site for $(T Classes|)', 'Show me the guidelines for $(T Classes|)', async jarvee => {
    jarvee.play('Sure thing. Pulling up the guidelines now', 'Absolutely! Showing the webpage now.')
    let page_url = Core_Guidelines_URL + 'main';
    jarvee.play({command: 'showWebPage', page_url});
});