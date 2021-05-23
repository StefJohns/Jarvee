// Define Constants & Arrays
onCreateProject(() => {
    project.ENUMSCATEGORIES = "set_|macro_|class|plain|operation_|caps|caital letter_|unnamed|underlying type_|value_";
});

// URL
const Core_Guidelines_URL = 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#';

// URL Pages Array
const URL_Pages = [
    'Renum-macro',
    'Renum-set',
    'Renum-class',
    'Renum-oper',
    'Renum-caps',
    'Renum-unnamed',
    'Renum-underlying',
    'Renum-value'
];

// Enumerations Definition
const Interface_Definition = "Enumerations are used to define sets of integer values and for defining types for such sets of values. There are two kind of enumerations, \?plain\? enums and class enums.";

// Rule Descriptions
const Rule_Descriptions = [
    'Prefer enumerations over macros.',
    'Use enumerations to represent sets of related named constants.',
    'Prefer class enums over plain enums.',
    'Define operations on enumerations for safe and simple use.',
    'Don\'t use ALL_CAPS for enumerators.',
    'Avoid unnamed enumerations.',
    'Specify the underlying type of an enumeration only when necessary.',
    'Specify enumerator values only when necessary.'
];

// Rule Reasons
const Rule_Reasons = [
    'Macros do not obey scope and type rules. Also, macro names are removed during preprocessing and so usually don\?t appear in tools like debuggers.',
    'An enumeration shows the enumerators to be related and can be a named type.',
    'To minimize surprises: traditional enums convert to int too readily.',
    'Convenience of use and avoidance of errors.',
    'Avoid clashes with macros.',
    'If you can?t name an enumeration, the values are not related',
    'The default is the easiest to read and write. int is the default integer type. int is compatible with C enums.',
    'It?s the simplest. It avoids duplicate enumerator values. The default gives a consecutive set of values that is good for switch-statement implementations.'
];

// Rule Notes
const Notes = [
    'No Notes Provided',
    'Switching on an enumeration is common and the compiler can warn against unusual patterns of case labels. ',
    'No Notes Provided',
    'No Notes Provided',
    'No Notes Provided',
    'No Notes Provided',
    'Specifying the underlying type is necessary in forward declarations of enumerations.',
    'No Notes Provided'
];

// Class Enforcement
const Enforcements = [

];

// Mutable Variables
let jResponse;
let jFollowUp;

// Play Definition
function playDefinition(jarvee){
    let def = Interface_Definition;
    if (def) { return Promise.resolve(def);}
    else { return Promise.resolve();}
}

// Number of Rules
function numRules(jarvee) {
    let numR = 'There are ' + Rule_Descriptions.length + ' available.';
    if (Rule_Descriptions.length) { return Promise.resolve(numR); }
    else { return Promise.resolve();}
}

// Initial Intents
// Info On C++ Enums
intent('(I would like information on|Do you have information on|Can you tell me about|) $(E Enums|Enumerations|Enumerators)?', async jarvee => {

    // Definition ? yes : no ; playDefinition
    jFollowUp = 'Would you like to hear the definition first?';
    jarvee.play({command: 'jarveeResponse', responseText: jFollowUp});
    jarvee.play(jFollowUp);
    let defAnswer = await jarvee.then(answerConfirm);
    if (defAnswer == "yes") {
        let definitionResponse = await playDefinition(jarvee);
        if (definitionResponse){
            jResponse = definitionResponse;
            jarvee.play({command: 'jarveeResponse', responseText: jResponse});
            jarvee.play(jResponse);
        } else { jarvee.play('Okay!'); }
    } else {
        jarvee.play('Okay!');
    }

    // Get Number of Rules ? yes : no ; numRules
    jFollowUp = 'Would you like to know the number of rules there are for Enums?';
    jarvee.play({command: 'jarveeResponse', responseText: jFollowUp});
    jarvee.play(jFollowUp);
    let rulesAnswer = await jarvee.then(answerConfirm);
    if (rulesAnswer === 'yes') 
    {
        let rulesResponse = await numRules(jarvee);
        if (rulesResponse) 
        {
            jResponse = rulesResponse;
            jarvee.play({command: 'jarveeResponse', responseText: jResponse});
            jarvee.play(jResponse);
        } else { 
            jarvee.play('Okay!'); 
        }
    } else {
        jarvee.play('Okay!');
    }

    // Get What The User Wants From Enums
    jResponse = 'What would you like to know?';
    jarvee.play({command: 'jarveeResponse', responseText: jResponse});
    jarvee.play(jResponse);
    let topicAnswer = await jarvee.then(getTopic);
    jResponse = "Let me grab information on " + topicAnswer + " for you.";
    jarvee.play(jResponse);
    
     // macro
    if (topicAnswer === 'macro' || topicAnswer === 'macros'){
        let page_url = Core_Guidelines_URL + URL_Pages[0];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[0];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[0];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }
});

// Show Web Page Intent
intent('(Show|Bring Up|) the main website for $(E Enums|Enumerations|Enumerators)', 'Show me the guidelines for $(E Enums|Enumerations|Enumerators)', async jarvee => {
    jarvee.play('Sure thing. Pulling up the guidelines now', 'Absolutely! Showing the webpage now.')
    let page_url = Core_Guidelines_URL + 'S-enum';
    jarvee.play({command: 'showWebPage', page_url});
});

// Get Specific Page Intent
intent('Show me the web(site|page) for enum $(ENUMCAT p:ENUMSCATEGORIES)', 'Can you pull up the web(site|page) for enum $(ENUMCAT p:ENUMSCATEGORIES)', '(Show|Bring Up|) the website for enum $(ENUMCAT p:ENUMSCATEGORIES)', async jarvee => {
    jarvee.play(`Sure. Pulling up the page on ${jarvee.ENUMCAT.value} now`);
    let keyword = jarvee.ENUMCAT.value;
    let page_url;
    switch (keyword) {
        case "macros" : page_url = Core_Guidelines_URL + URL_Pages[0]; break;
        case "macro": page_url = Core_Guidelines_URL + URL_Pages[0]; break;
        case "sets" : page_url = Core_Guidelines_URL + URL_Pages[1]; break;
        case "set": page_url = Core_Guidelines_URL + URL_Pages[1]; break;
        case "class" : page_url = Core_Guidelines_URL + URL_Pages[2]; break;
        case "operations" : page_url = Core_Guidelines_URL + URL_Pages[3]; break;
        case "operation": page_url = Core_Guidelines_URL + URL_Pages[3]; break;
        case "caps" : page_url = Core_Guidelines_URL + URL_Pages[4]; break;
        case "capital letters": page_url = Core_Guidelines_URL + URL_Pages[4]; break;
        case "unnamed" : page_url = Core_Guidelines_URL + URL_Pages[5]; break;
        case "underlying types": page_url = Core_Guidelines_URL + URL_Pages[6]; break;
        case "underlying type": page_url = Core_Guidelines_URL + URL_Pages[6]; break;
        case "values" : page_url = Core_Guidelines_URL + URL_Pages[7]; break;
        case "value": page_url = Core_Guidelines_URL + URL_Pages[7]; break;
    }
    jarvee.play({command: 'showWebPage', page_url});
});

// Contexts
// Confirm Answer Context
let answerConfirm = context(() => {
    intent('$(Answer yes|no|)', jarvee => {
        return jarvee.resolve(jarvee.Answer.value.toLowerCase());
    });
});

// Get Topic
let getTopic = context(() => {
    intent('(I would like information on|Do you have information on|Can you tell me about|) $(ENUMCAT p:ENUMSCATEGORIES)', jarvee => {
        return jarvee.resolve(jarvee.ENUMCAT.value.toLowerCase());
    });
});
