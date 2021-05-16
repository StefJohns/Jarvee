// Subsection Concrete Types for the Class Section of C++ Core Guidelines
// Define Constants and Arrays

// URL
const Core_Guidelines_URL = 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#';

// Pages
const URL_Pages = [
    'cconcrete-concrete-types',
    'c10-prefer-concrete-types-over-class-hierarchies',
    'c11-make-concrete-types-regular'
];

// Definition
const Concrete_Definition = 'One ideal for a class is to be a regular type. That means roughly \"behaves like an int\". A concrete type is the simplest kind of class. A value of regular type can be copied and the result of a copy is an independent object with the same value as the original. Concrete classes without assignment and equality can be defined, tut they are rare. The C++ built-in types are regular, and so are the standard-library classes, such as string, vector, and map. Concrete types are also often referred to as value types to distinguish them from types used as part of a hierarchy.';

// Rule Descriptions
const Rule_Descriptions = [
    'Prefer concrete types over class hierarchies.',
    'Make concrete types regular.'
];

// Rule Reasons
const Rule_Reasons = [
    'a concrete type is fundementally simpler than a hierarchy: easier to design, easier to implement, easier to use, easier to reason about, smaller, and faster. You need a reason (use cases) for using hierarchy.',
    'regular types are easier to understand and reason about than types that are not regular (irregularities require extra effort to understand and use).'
];

// Notes
const Notes = [
    'Concrete types can be stack-allocated and be members of other classes.',
    'Handles for resources that connot be cloned, resemble concrete types in that they most often are stack-allocated. However, objects of such types typically cannot be copied (instead, they can usually be moved), so they can\'t be regular\; instead, they tend to be semiregular. Often, such types are referred to as \"move-only types\".'
];

// Enforcements
const Enforcements = [
    'No Enforcement Suggested',
    'No Enforcement Suggested'
];