const CORE_GUIDELINES_URL = 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#';

const URL_PAGE = [
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

const CLASS_RULE_DESCRIPTIONS = [
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

const CLASS_RULE_REASONS = [
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

const CLASS_NOTES = [];

const CLASS_DEFINITION = [];

const CLASS_ENFORCEMENT = [];

const GOOD_CODE_RULES = [
    'void draw\(Point from, Point to\);     // Better',
    'struct Pair {  string name; int volume; };     // the members can vary independently',
    'no good example set',
    'no good example set',
    'no good example set',
    'no good example set',
    'no good example set',
    'no good example set',
    'no good example set',
    'no good example set'
];

const BAD_CODE_RULES = [
    'void draw\(int x, int y, int x2, int y2\);     // BAD: unnecessary implicit relationships',
    'no bad example set',
    'no bad example set',
    'no bad example set',
    'no bad example set',
    'no bad example set',
    'no bad example set',
    'no bad example set',
    'no bad example set',
    'no bad example set'
];

// Confirm Answer Function
let answerConfirm = context(() => {
    intent('$(A yes|Yes|no|No)', p => {
        return p.resolve(p.A.value.toLowerCase());
    });
});

// Initial Intent

let jResponse;
let jFollowUp;

intent('(What can you tell me|Do you know anything) about $(TOPIC C++ Classes|Classes)?', async p => {
    jResponse = 'I can tell you quite a bit about' + p.TOPIC.value;
    p.play({ command: 'jarveeResponse', responseText: jResponse});
    p.play(jResponse);
    jFollowUp = 'Would you like to know the number of rules available?';
    p.play({ command: 'jarveeResponse', responseText: jFollowUp});
    p.play(jFollowUp)
    let answer = await p.then(answerConfirm);
    if (answer == "yes") {
        jResponse = 'There are ' + CLASS_RULE_DESCRIPTIONS.length + 'rules available';
        p.play({ command: 'jarveeResponse', responseText: jResponse});
        p.play(jResponse);
        jFollowUp = 'Which rule would you like?';
        p.play({ command: 'jarveeResponse', responseText: jFollowUp});
        p.play(jFollowUp);
        p.then(whichRule);
    } else {
        jResponse = 'By number, which rule would you like?';
        p.play({ command: 'jarveeResponse', responseText: jResponse});
        p.play(jResponse);
        p.then(whichRule);
    }
    
});
intent('(Thanks|Thank you)', p => {
                p.play({ command: 'jarveeResponse', responseText: 'My pleasure!'});
                p.play('My Pleasure!');
                p.play({ command: 'showWebPage', page_url: (CORE_GUIDELINES_URL + 'main')});
            });


let whichRule = context(() => {
    intent('(I want rule number|Rule number|Rule) $(C_RULE 1|2|3|4|5|6|7|8|9|10)', async p => {
        jResponse = 'Making sure I heard correctly, you\'d like rule number ' + p.C_RULE.value + ' right?';
        p.play({ command: 'jarveeResponse', responseText: jResponse});
        p.play(jResponse);
        let answer = await p.then(answerConfirm);
        if (answer == "yes"){
            let page_url = CORE_GUIDELINES_URL + URL_PAGE[p.C_RULE.value - 1];
            p.play({command: 'showWebPage', page_url});
        jResponse = 'Rule number '+ p.C_RULE.value +': '+ CLASS_RULE_DESCRIPTIONS[p.C_RULE.value - 1];
            p.play(jResponse);
        jResponse = 'The reason for this is because ' + CLASS_RULE_REASONS[p.C_RULE.value - 1];
            p.play({ command: 'jarveeResponse', responseText: jResponse});
            p.play(jResponse);
            p.play('Here is a good example of this.');
            p.play({ command: 'showCodeExample', badCode: GOOD_CODE_RULES[p.C_RULE.value - 1] });
            p.play('Here is a bad example of this.');
            p.play({ command: 'showCodeExample', badCode: BAD_CODE_RULES[p.C_RULE.value - 1] });
        } else {
            jResponse = 'Which rule would you like then?';
            p.play(jResponse);
            p.then(whichRule);
        }
    });
});

