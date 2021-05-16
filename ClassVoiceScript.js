// Define Constants & Arrays
// URL
const Core_Guidelines_URL = 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#';

// URL Pages Array
const URL_Pages = [
    'Rc-org',
    'Rc-struct',
    'Rc-interface',
    'Rc-member',
    'Rc-helper',
    'Rc-standalone',
    'Rc-class',
    'Rc-private',
    'Rc-concrete',
    'Rc-regular'
];

// Class Definition
const Class_Definition = "A class is a user-defined type, for which a programmer can define the representation, operations, and interfaces. Class hierarchies are used to organize related classes into hierarchical structures.";

// Class Rule Descriptions
const Rule_Descriptions = [
    'Organize related data into structures (structs or classes)',
    'Use class if the class has an invariant; use struct if the data members can vary independently',
    'Represent the distinction between an interface and an implementation using a class',
    'Make a function a member only if it needs direct access to the representation of a class',
    'Place helper functions in the same namespace as the class they support',
    'Don\'t define a class or enum and declare a variable of its type in the same statement',
    'Use class rather than struct if any member is non-public',
    'Minimize exposure of members',
    'Prefer concrete types over class hierarchies',
    'Make concrete types regular'
];

// Class Rule Reasons
const Rule_Reasons = [
    'ease of comprehension. If data is related (for fundamental reasons), that fact should be reflected in code.',
    'an explicit distinction between interface and implementation improves readability and simplifies maintenance.',
    'less coupling than with member functions, fewer functions that can cause trouble by modifying object state, reduces the number of functions that needs to be modified after a change in representation.',
    'a helper function is a function (usually supplied by the writer of a class) that does not need direct access to the representation of the class, yet is seen as part of the useful interface to the class. Placing them in the same namespace as the class makes their relationship to the class obvious and allows them to be found by argument dependent lookup.',
    'mixing a type definition and the definition of another entity in the same declaration is confusing and unnecessary.',
    'of readability. To make it clear that something is being hidden/abstracted. This is a useful convention.',
    'of encapsulation. Information hiding. Minimize the chance of unintended access. This simplifies maintenance.',
    'a concrete type is fundamentally simpler than a hierarchy: easier to design, easier to implement, easier to use, easier to reason about, smaller, and faster. You need a reason (use cases) for using a hierarchy.',
    'regular types are easier to understand and reason about than types that are not regular (irregularities requires extra effort to understand and use).'
];

// Class Rule Notes
const Notes = [
    'A simple class without virtual functions implies no space or time overhead. From a language perspective class and struct differ only in the default visibility of their members',
    'An invariant is a logical condition for the members of an object that a constructor must establish for the public member functions to assume. After the invariant is established (typically by a constructor) every member function can be called for the object. An invariant can be stated informally (e.g., in a comment) or more formally using Expects. If all data members can vary independently of each other, no invariant is possible. If a class has any private data, a user cannot completely initialize an object without the use of a constructor. Hence, the class definer will provide a constructor and must specify its meaning. This effectively means the definer need to define an invariant',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
];

// Class Enforcement
const Enforcements = [
    'Probably impossible. Maybe a heuristic looking for data items used together is possible.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
];

onCreateProject(() => {
    project.CLASSCATEGORIES = "Organization|Struct_|Interface_|Member_|Helper Function_|Standalone_|Class Over Struct_|Encapsulation|Concrete Type_|Regular Type_";
    project.CLASSRULENUMS = "1|2|3|4|5|6|7|8|9|10";
});

// Mutable Variables
let jResponse;
let jFollowUp;

// Play Definition
function playDefinition(jarvee){
    let def = Class_Definition;
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
// Info On C++ Classes
intent('(I would like information on|Do you have information on|Can you tell me about ) $(T Classes)?', async jarvee => {
    
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
    
    // Pick Rule ?
    //jFollowUp = 'Would you like to pick a rule?';
    //jarvee.play({command: 'jarveeResponse', responseText: jFollowUp });
    //jarvee.play(jFollowUp);
    //let pickRule = await jarvee.then(answerConfirm);
    
    //if (pickRule === 'yes') 
    //{
    //    let pickResponse = await jarvee.then(getRuleNumber);
    //    if (pickResponse) 
    //    {
    //        let page_url = Core_Guidelines_URL + URL_Pages[pickResponse - 1];
    //        jarvee.play({command: 'showWebPage', page_url});
    //        jResponse = 'Rule number '+ pickResponse +': '+ Rule_Descriptions[pickResponse - 1];
    //        jarvee.play(jResponse);
    //    } else {
    //        jarvee.play('Okay!');
    //    }
    //} else {
    //    jarvee.play('Okay!');
    //} 
    
    // Get What The User Wants From Classes
    jResponse = 'What topic would you like to know?';
    jarvee.play({command: 'jarveeResponse', responseText: jResponse});
    jarvee.play(jResponse);
    let topicAnswer = await jarvee.then(getTopic);
    jResponse = "Let me grab information on " + topicAnswer + " for you.";
    jarvee.play(jResponse);
    
    // Organization
    if (topicAnswer === "Organization"){
        let page_url = Core_Guidelines_URL + URL_Pages[0];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[0];
        jarvee.play(jResponse);
        jResponse = 'The reason for this is because ' + Rule_Reasons[0];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);  
    }
    
    // Structs
    if (topicAnswer === "Struct" | topicAnswer === "Structs"){
        let page_url = Core_Guidelines_URL + URL_Pages[1];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[1];
        jarvee.play(jResponse);
        jResponse = 'The reason for this is because ' + Rule_Reasons[1];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);  
    }
    
    // Interfaces
    if (topicAnswer === "Interface" | topicAnswer === "Interfaces"){
        let page_url = Core_Guidelines_URL + URL_Pages[2];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[2];
        jarvee.play(jResponse);
        jResponse = 'The reason for this is because ' + Rule_Reasons[2];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);  
    }
    
    // Members
    if (topicAnswer === "Member" | topicAnswer === "Members"){
        let page_url = Core_Guidelines_URL + URL_Pages[3];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[3];
        jarvee.play(jResponse);
        jResponse = 'The reason for this is because ' + Rule_Reasons[3];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);  
    }
    
    // Helper Functions
    if (topicAnswer === "Helper Function" | topicAnswer === "Helper Functions"){
        let page_url = Core_Guidelines_URL + URL_Pages[4];
        jarvee.play({command: 'showWebPage', page_url});
        jResponse = Rule_Descriptions[4];
        jarvee.play(jResponse);
        jResponse = 'The reason for this is because ' + Rule_Reasons[4];
        jarvee.play({ command: 'jarveeResponse', responseText: jResponse});
        jarvee.play(jResponse);  
    }
});

// Contexts
// Confirm Answer Context
let answerConfirm = context(() => {
    intent('$(Answer yes|no|)', jarvee => {
        return jarvee.resolve(jarvee.Answer.value.toLowerCase());
    });
});

// Get Specific Rule
let getRuleNumber = context(() => {
    intent('(Rule Number| Number| Rule|) $(NUMBER)', jarvee => { 
        return jarvee.resolve(jarvee.NUMBER.number);
    });
});

// Get Topic
let getTopic = context(() => {
    intent('(I would like information on|Do you have information on|Can you tell me about|) $(CATEGORY p:CLASSCATEGORIES)', jarvee => {
        return jarvee.resolve(jarvee.CATEGORY.value);
    });
});
