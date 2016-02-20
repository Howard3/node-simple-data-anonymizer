# Introduction

This module is extremely simple and attempts to do nothing more than one task. It has no dependencies unless you're 
testing it.

It was developed for the sole purpose of anonymizing data so that it can securely be transmitted to third party 
services such as analytics platforms.

To install it, use `npm install simple-data-anonymizer`

## Usage
The only function available accepts three arguments: `stringAnonymizer(string_to_be_anonymized, beginning, end)`

The _beginning_ and _end_ arguments define where the anonymizer should leave data visible.


### Simple Usage
```javascript
var stringAnonymizer = require('simple-data-anonymizer').string;

stringAnonymizer('foobaruser@emailservice.com', 2, '@'); // returns fo********@emailservice.com
```

### More Advanced usage
The anonymizer accepts an array of values to iterate over so that it can find a matching string. It chooses the 
position identifier by order of the array:

```javascript
stringAnonymizer('foobaruser@emailservice.com', ['-', 'bar', 2], '@'); // returns foobar****@emailservice.com
```

The _begininng_ and _end_ arguments are capable of receiving an ordered list to look through.