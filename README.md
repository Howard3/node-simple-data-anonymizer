[![Build Status](https://travis-ci.org/Howard3/node-simple-data-anonymizer.svg?branch=master)](https://travis-ci.org/Howard3/node-simple-data-anonymizer)

# Introduction

This module is extremely simple and attempts to do nothing more than one task. It has no dependencies unless you're 
testing it.

It was developed for the sole purpose of anonymizing data so that it can securely be transmitted to third party 
services such as analytics platforms.

To install it, use `npm install simple-data-anonymizer`

## Usage
The only function available accepts three arguments: `stringAnonymizer(string_to_be_anonymized, beginning, end)`

The _beginning_ and _end_ arguments define where the anonymizer should leave data visible.

**beginning** and **end** arguments are absolute. The particular implication here is that for **end** if you wish to 
keep only the last 4 characters you should supply `-4`

### Simple Usage
```javascript
var stringAnonymizer = require('simple-data-anonymizer').string;

stringAnonymizer('foobaruser@emailservice.com', 2, '@'); // returns fo********@emailservice.com
stringAnonymizer('foobaruser@emailservice.com', '@', -4); // returns foobaruser@************.com
stringAnonymizer('foobaruser@emailservice.com', 4, -4); // returns foob*******************.com
```

### More Advanced usage
The anonymizer accepts an array of values to iterate over so that it can find a matching string. It chooses the 
position identifier by order of the array:

```javascript
stringAnonymizer('foobaruser@emailservice.com', ['-', 'bar', 2], '@'); // returns foobar****@emailservice.com
stringAnonymizer('foobaruser@emailservice.com', ['s', 'bar', 2], ['mail', '.', -4]); // returns foobarus****mailservice.com
```

The anonymizer will use the first occurrence of the character for the _beginning_ position and the last occurrence 
for the _end_ position. For example:

```javascript
var string = 'abc.abc.abc.abc';

stringAnonymizer(string, 3, '.');   // returns abc********.abc
stringAnonymizer(string, '.', '.'); // returns abc.*******.abc
stringAnonymizer(string, '.', -3);  // returns abc.********abc
```

The _begininng_ and _end_ arguments are capable of receiving an ordered list to look through.
