// Define Constants & Arrays
onCreateProject(() => {
    project.INTERFACESCATEGORIES = "explicit_|global_|singleton_|typed|preconditions|expects funtion|postcondition_|ensures function|concepts|exception_|raw pointer_|null pointer_|array_|global initialization|number of argument_|argument_|unrelated parameter_|adjacent parameter_|abstract class_|A B I|Pimpl|encapulate|encapsulation";
});

// URL
const Core_Guidelines_URL = 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#';

// URL Pages Array
const URL_Pages = [
    'Ri-explicit',
    'Ri-global',
    'Ri-singleton',
    'Ri-typed',
    'Ri-pre',
    'Ri-expects',
    'Ri-post',
    'Ri-ensures',
    'Ri-concepts',
    'Ri-except',
    'Ri-raw',
    'Ri-nullptr',
    'Ri-array',
    'Ri-global-init',
    'Ri-nargs',
    'Ri-unrelated',
    'Ri-abstract',
    'Ri-abi',
    'Ri-pimpl',
    'Ri-encapsulate'
];

// Interface Definition
const Interface_Definition = "An interface is a contract between two parts of a program. Precisely stating what is expected of a supplier of a service and a user of that service is essential. Having good (easy-to-understand, encouraging efficient use, not error-prone, supporting testing, etc.) interfaces is probably the most important single aspect of code organization.";

// Rule Descriptions
const Rule_Descriptions = [
    'Make interfaces explicit.',
    'Avoid non-const global variables.',
    'Avoid singletons.',
    'Make interfaces precisely and strongly typed.',
    'State preconditions\(if any\).',
    'Prefer \'Expects\(\)\' for expressing conditions',
    'State postconditions.',
    'Prefer \'Ensures\(\)\' for expressing postconditions',
    'If an interface is a template, document its parameters using concepts.',
    'Use exceptions to signal a failure to perform a required task.',
    'Never tranfer ownership by a raw pointer \(T*\) or reference \(T&\).',
    'Declare a pointer that must not be null as \'not_null\'.',
    'Do not pass an array as a single pointer.',
    'Avoid complex initialization of global objects.',
    'Keep the number of function arguments low.',
    'Avoid adjacent parameters that can be invoked by the same arguments in either order with different meaning.',
    'Prefer empty abstract classes as interfaces to class hierarchies.',
    'If you want a cross-compiler ABI, use a C-style subset.',
    'For stable library ABI, consider the Pimpl idiom.',
    'Encapsulate rule violations.'
];

// Rule Reasons
const Rule_Reasons = [
    'Correctness. Assumptions not stated in an interface are easily overlooked and hard to test.',
    'Non-const global variables hide dependencies and make the dependencies subject to unpredictable changes.',
    'Singletons are basically complicated global objects in disguise.',
    'Types are the simplest and best documentation, improve legibility due to their well-defined meaning, and are checked at compile time. Also, precisely typed code is often optimized better.',
    'Arguments have meaning that might constrain their proper use in the callee.',
    'To make it clear that the condition is a precondition and to enable tool use.',
    'To detect misunderstandings about the result and possibly catch erroneous implementations.',
    'To make it clear that the condition is a postcondition and to enable tool use.',
    'Make the interface precisely specified and compile-time checkable in the \(not so distant\) future.',
    'It should not be possible to ignore an error because that could leave the system or a computation in an undefined \(or unexpected\) state. This is a major source of errors.',
    'If there is any doubt whether the caller or the callee owns an object, leaks or premature destruction will occur.',
    'To help avoid dereferencing nullptr errors. To improve performance by avoiding redundant checks for nullptr.',
    '\(pointer, size\)-style interfaces are error-prone. Also, a plain pointer \(to array\) must rely on some convention to allow the callee to determine the size.',
    'Complex initialization can lead to undefined order of execution.',
    'Having many arguments opens opportunities for confusion. Passing lots of arguments is often costly compared to alternatives.',
    'Adjacent arguments of the same type are easily swapped by mistake.',
    'Abstract classes that are empty \(have no non-static member data\) are more likely to be stable than base classes with state.',
    'Different compilers implement different binary layouts for classes, exception handling, function names, and other implementation details.',
    'Because private data members participate in class layout and private member functions participate in overload resolution, changes to those implementation details require recompilation of all users of a class that uses them. A non-polymorphic interface class holding a pointer to implementation \(Pimpl\) can isolate the users of a class from changes in its implementation at the cost of an indirection.',
    'To keep code simple and safe. Sometimes, ugly, unsafe, or error-prone techniques are necessary for logical or performance reasons. If so, keep them local, rather than \?infecting\? interfaces so that larger groups of programmers have to be aware of the subtleties. Implementation complexity should, if at all possible, not leak through interfaces into user code.'
];

// Rule Notes
const Notes = [
    'No Notes On This Rule',
    ['Global constants are useful.', 'The rule against global variables applies to namespace scope variables as well.', 'You cannot have a race condition on immutable data.'],
    'If you don?t want a global object to change, declare it const or constexpr.'
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
// Info On C++ Interfaces
intent('(I would like information on|Do you have information on|Can you tell me about|) $(T Interfaces)?', async jarvee => {

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
    jFollowUp = 'Would you like to know the number of rules there are for classes?';
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

    // Get What The User Wants From Interfaces
    jResponse = 'What would you like to know?';
    jarvee.play({command: 'jarveeResponse', responseText: jResponse});
    jarvee.play(jResponse);
    let topicAnswer = await jarvee.then(getTopic);
    jResponse = "Let me grab information on " + topicAnswer + " for you.";
    jarvee.play(jResponse);

    // explicit
    if (topicAnswer === 'explicit' || topicAnswer === 'explicits'){
        let page_url = Core_Guidelines_URL + URL_Pages[0];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[0];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[0];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);

        //jResponse = 'To enforce this, do the following: ' + Enforcements[0];
        //jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        //jarvee.play(jResponse);
    }

    // globals
    if (topicAnswer === 'global' || topicAnswer === 'globals'){
        let page_url = Core_Guidelines_URL + URL_Pages[1];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[1];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[1];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // singletons
    if (topicAnswer === 'singleton' || topicAnswer === 'singletons'){
        let page_url = Core_Guidelines_URL + URL_Pages[2];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[2];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[2];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // typed
    if (topicAnswer === 'typed'){
        let page_url = Core_Guidelines_URL + URL_Pages[3];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[3];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[3];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // preconditions
    if (topicAnswer === 'precondtions'){
        let page_url = Core_Guidelines_URL + URL_Pages[4];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[4];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[4];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // expects function
    if (topicAnswer === 'expects function'){
        let page_url = Core_Guidelines_URL + URL_Pages[5];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[5];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[5];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // postconditions
    if (topicAnswer === 'postcondition' || topicAnswer === 'postconditions'){
        let page_url = Core_Guidelines_URL + URL_Pages[6];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[6];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[6];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // ensures function
    if (topicAnswer === 'ensures function'){
        let page_url = Core_Guidelines_URL + URL_Pages[7];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[7];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[7];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }
    
    // concepts
    if (topicAnswer === 'concepts'){
        let page_url = Core_Guidelines_URL + URL_Pages[8];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[8];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[8];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // exceptions
    if (topicAnswer === 'exception' || topicAnswer === 'exceptions'){
        let page_url = Core_Guidelines_URL + URL_Pages[9];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[9];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[9];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // raw pointers
    if (topicAnswer === 'raw pointer' || topicAnswer === 'raw pointers'){
        let page_url = Core_Guidelines_URL + URL_Pages[10];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[10];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[10];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // nullptr
    if (topicAnswer === 'null pointer'  || topicAnswer === 'null pointers'){
        let page_url = Core_Guidelines_URL + URL_Pages[11];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[11];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[11];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // arrays
    if (topicAnswer === 'array' || topicAnswer === 'arrays'){
        let page_url = Core_Guidelines_URL + URL_Pages[12];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[12];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[12];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // global initialization
    if (topicAnswer === 'global initialization'){
        let page_url = Core_Guidelines_URL + URL_Pages[13];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[13];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[13];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }
    
    // number of arguments
    if (topicAnswer === 'number of argument' || topicAnswer === 'number of argruments' || topicAnswer === 'argument' || topicAnswer === 'argruments'){
        let page_url = Core_Guidelines_URL + URL_Pages[14];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[14];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[14];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // unrelated and adjacent parameters
    if (topicAnswer === 'unrelated parameter' || topicAnswer === 'unrelated parameters' || topicAnswer === 'adjacent parameter' || topicAnswer === 'adjacent parameters'){
        let page_url = Core_Guidelines_URL + URL_Pages[15];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[15];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[15];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }

    // abstract class
    if (topicAnswer === 'abstract class' || topicAnswer === 'abstract classes'){
        let page_url = Core_Guidelines_URL + URL_Pages[16];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[16];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[16];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }
    
    // ABI
    if (topicAnswer === 'a b i'){
        let page_url = Core_Guidelines_URL + URL_Pages[17];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[17];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[17];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }
    
    // Pimpl
    if (topicAnswer === 'pimpl'){
        let page_url = Core_Guidelines_URL + URL_Pages[18];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[18];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[18];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }
    
    // encapsulation
    if (topicAnswer === 'encapulate' || topicAnswer === 'encapsulation'){
        let page_url = Core_Guidelines_URL + URL_Pages[19];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[19];
        jarvee.play(jResponse);

        jResponse = 'The reason for this is because ' + Rule_Reasons[19];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);
    }



});

// Show Web Page Intent
intent('Show me the main web (site|page) for $(I Interfaces)', 'Can you pull up the main web (site|page) for $(I Interfaces)', '(Show|Bring Up|) the main web site for $(I Interfaces)', 'Show me the guidelines for $(I Interfaces)', async jarvee => {
    jarvee.play('Sure thing. Pulling up the guidelines now', 'Absolutely! Showing the webpage now.')
    let page_url = Core_Guidelines_URL + 'S-interfaces';
    jarvee.play({command: 'showWebPage', page_url});
});

// Get Specific Page Intent
intent('Show me the web (site|page) for $(INTERFACECAT p:INTERFACESCATEGORIES) in Interfaces', 'Can you pull up the web (site|page) for $(INTERFACECAT p:INTERFACESCATEGORIES) in Interfaces', '(Show|Bring Up|) the web site for $(INTERFACECAT p:INTERFACESCATEGORIES) in Interfaces', async jarvee => {
    jarvee.play(`Sure. Pulling up the page on ${jarvee.INTERFACECAT.value.toLowerCase()} now`);
    let keyword = jarvee.INTERFACECAT.value;
    let page_url;
    if (keyword == 'null pointer' || keyword == 'null pointers') {
        page_url = Core_Guidelines_URL + 'Ri-nullptr';
    }
    else if (keyword == 'number of arguments' || keyword == 'arguments') {
        page_url = Core_Guidelines_URL + 'Ri-nargs';
    }
    else if (keyword == 'a b i') {
        page_url = Core_Guidelines_URL + 'Ri-abi';
    }
    else if (keyword == 'unrelated parameters' || keyword == 'unrelated parameter' || keyword == 'adjacent parameters' || keyword == 'adjacent parameter') {
        page_url = Core_Guidelines_URL + 'Ri-unrelated';
    }
    else if (keyword == 'glabal initialization') {
        page_url = Core_Guidelines_URL + 'Ri-global-init';
    }
    else {
        page_url = Core_Guidelines_URL + 'Ri-' + keyword;
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
    intent('(I would like information on|Do you have information on|Can you tell me about|) $(INTERFACECAT p:INTERFACESCATEGORIES)', jarvee => {
        return jarvee.resolve(jarvee.INTERFACECAT.value.toLowerCase());
    });
});
