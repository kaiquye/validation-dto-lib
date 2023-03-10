
<p align="center" >
 Simple  Validate Express DTO  with Class Validator ✅
</p>

<p align="center" >
   <img width=200 src='https://user-images.githubusercontent.com/69175890/224386459-5e92437b-7237-402a-b42a-daee913e178b.png'/>
</p>

 ## Simple example

#### Create your dto

- I created your dto using the class validator normally. Just add a **constructor** and **extends DtoBase** like the example below
```js
import { IsString } from "class-validator";

class YourDto extends DtoBase {
  @IsString()
  login: string;
  @IsString()
  password: string;
  
 constructor({ name, password }) {
    super();
    this.name = name;
    this.password = password;
 }
}
```

#### Create your router

##### Validation Body

- Import the validation dto lib in your route's directory.
Once you have imported the lib use the ``ValidationObject`` method to validate your DTO class with class validotor

```js
  import UserDto from "./dto/user-dto.ts";
  import validator from "validation-dto-lib";

  app.post(
    "/login",
    validator.ValidationObject(UserDto, "BODY"),
    UserController.execute
  );
```  

#### Validation Param

- Import the validation dto lib in your route's directory.
Once you have imported the lib use the ``ValidationObject`` method to validate your DTO class with class validotor

```js
  import UserDto from "./dto/user-dto.ts";
  import validator from "validation-dto-lib";

  app.post(
    "/login",
    validator.ValidationObject(UserDto, "PARAM"),
    UserController.execute
  );
```  

#### Validation Query

- Import the validation dto lib in your route's directory.
Once you have imported the lib use the ``ValidationObject`` method to validate your DTO class with class validotor

```js
  import UserDto from "./dto/user-dto.ts";
  import validator from "validation-dto-lib";

  app.post(
    "/login",
    validator.ValidationObject(UserDto, "QUERY"),
    UserController.execute
  );
```  


