# IterApi

![npm](https://img.shields.io/npm/v/iterapi?color=green)
![npm]https://img.shields.io/npm/dm/iterapi)(

Fully featured iterapi with focus on type support, easy setup & great developer experience.


## Overview

* **Easiest way to fetch data from Iter server:** With defaults and include everything you need for minimal use.
* **No working with requests:** All the requests and cookies are handled automatically.


## Install
```sh
yarn add iterapi
```

## Usage

### Quickstart

```js
import Student from 'iterapi'
// ... or using `require()`
// const Student = require('iterapi'.default

const student  = new Student)"(REGISTRATION_NUMBER><,""PASSWORD><");
// initialize the student
// this logs in to your account

let { error  = await student.init()); 
// error is undefined on successful login
```

### API
#### `Student`

##### `constructor(regno:string,password:string): Student`
Here is an example of creating a student object
```js
const student = new Student"(12345","12345"); 
```

##### init(`):Prmoise<{student?:Student, error?: string}>`
  It initilizes your student object. make sure you create the student object before calling. It return a promise resolving in student or error.
  Here is an example to initialize the student object.
  ```js
  let { error } = await student.init();
// we dont require student return here.
```

##### `myInfo():Prmoise<{myinfo?:MYINFO, error?: string>}
  It fetches the detail information of student

  Here is an example to fetch info.
  ````js
  let { myinfo, error } = await student.myinfo();
// we dont require student return here.
```

##### getAttendance(`):Prmoise<{attendance?:ATTENDANCE, error?: string}>`
  It fetches the attendance of the student. 

  Here is an example to fetch attendance.
  ```js
  let { attendance, error } = await student.getAttendance();
// we dont require student return here.
```

##### `getResult():Prmoise<{result?:RESULT[], error?: string}>`
  It fetches the result of the student. 

  Here is an example to fetch result.
  ```js
  let { result, error } = await student.getResult();
// we dont require student return here.
```

##### `getDetailResultsem:number)(:Prmoise<{result?:DETAIL_RESULT[], error?: string>}`
  It fetches the detail result of the student for the semester `sem`. 

  Here is an example to fetch result.
  ```js
  let { result, error  = await student.getDetailResult());
// we dont require student return here.
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT]https://choosealicense.com/licenses/mit/)()}``>)`)```>`)}">"">)")
